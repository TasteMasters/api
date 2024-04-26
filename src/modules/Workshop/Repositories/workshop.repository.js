import { Client } from '../../../../database/database.service.js';
import { WorkshopEntity } from '../../../entities/workshop.entity.js';
import { v4 as uuid } from 'uuid';

export class WorkshopRepository {
  /**
   * Retrieves all workshops from the database.
   * @returns {WorkshopEntity[] | undefined} An array of WorkshopEntity instances representing all workshops, or undefined if no workshops are found.
   */
  static async findAll() {
    const { rows } = await Client.query('SELECT * FROM workshops;');

    if (!rows || rows.length === 0) {
      return undefined;
    }

    const workshops = rows.map((row) => new WorkshopEntity(row));

    return workshops;
  }

  static async create(workshopData, topicsData) {
    const client = await Client.connect(); // Conecte-se ao banco de dados

    try {
      await client.query('BEGIN'); // Inicie a transação

      const workshopId = uuid();

      await client.query(
        `INSERT INTO workshops (id, title, description, category, difficulty, image, start_date, creator_id, creator_name, creator_experience,ingredients, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`,
        [
          workshopId,
          workshopData.title,
          workshopData.description,
          workshopData.category,
          workshopData.difficulty,
          workshopData.image,
          workshopData.start_date,
          workshopData.creator_id,
          workshopData.creator_name,
          workshopData.creator_experience,
          workshopData.ingredients,
          new Date(),
          null,
        ]
      );

      for (const topicData of topicsData) {
        await client.query(
          `INSERT INTO workshop_topics (id, title, estimated_time, description, video_link, completed, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
          [
            workshopId,
            topicData.title,
            topicData.estimated_time,
            topicData.description,
            topicData.video_link,
            topicData.completed,
            new Date(),
            null,
          ]
        );
      }

      await client.query('COMMIT');

      return true;
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Erro ao criar workshop e tópicos:', error);
      return false;
    } finally {
      client.release();
    }
  }
}
