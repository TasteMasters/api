import { Client } from '../../../../database/database.service.js';
import { WorkshopTopicsEntity } from '../../../entities/workshop-topics.entity.js';
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

  static async create(workshopData) {
    const client = await Client.connect(); // Conecte-se ao banco de dados

    try {
      await client.query('BEGIN'); // Inicie a transação

      const workshopId = uuid();

      await client.query(
        `INSERT INTO workshops (id, title, description, category, difficulty, image, start_date, creator_id, ingredients, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`,
        [
          workshopId,
          workshopData.title,
          workshopData.description,
          workshopData.category,
          workshopData.difficulty,
          workshopData.image,
          workshopData.start_date,
          workshopData.creator_id,
          workshopData.ingredients,
          new Date(),
          null,
        ]
      );

      for (const topicData of workshopData.topics) {
        console.log(topicData);
        await client.query(
          `INSERT INTO workshop_topics (id, workshop_id, title, estimated_time, description, video_link, completed, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
          [
            uuid(),
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

  /**
   * Finds a workshop by its ID.
   * @param {number} id - The ID of the workshop to find.
   * @returns {WorkshopEntity | undefined} The workshop entity if found, or undefined if not found.
   */

  static async findById(id) {
    const { rows } = await Client.query('SELECT * FROM workshops WHERE id = $1;', [id]);

    if (!rows || rows.length === 0) {
      return undefined;
    }

    const workshop = new WorkshopEntity(rows[0]);

    const { rows: rowsTopics } = await Client.query('SELECT * FROM workshop_topics WHERE workshop_id = $1;', [id]);

    let topics = [];

    if (rowsTopics && rowsTopics.length > 0) {
      rowsTopics.map((row) => topics.push(new WorkshopTopicsEntity(row)));
    }

    workshop.topics = topics;

    return workshop;
  }

  static async findUserWorkshops(userId) {
    const { rows } = await Client.query('SELECT * FROM workshops WHERE creator_id = $1;', [userId]);

    if (!rows || rows.length === 0) {
      return undefined;
    }

    const workshops = rows.map((row) => new WorkshopEntity(row));

    return workshops;
  }

  static async delete(id) {
    try {
      await Client.query('DELETE FROM workshops WHERE id = $1;', [id]);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
