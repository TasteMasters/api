import { Client } from '../../../../database/database.service.js';
import { WorkshopTopicsEntity } from '../../../entities/workshop-topics.entity.js';
import { WorkshopEntity } from '../../../entities/workshop.entity.js';
import { v4 as uuid } from 'uuid';
import { WorkshopTopicsRepository } from './workshop-topics.repository.js';

export class WorkshopRepository {
  static async findAll() {
    const { rows } = await Client.query('SELECT * FROM workshops;');

    if (!rows || rows.length === 0) {
      return undefined;
    }

    const workshops = rows.map((row) => new WorkshopEntity(row));

    return workshops;
  }

  static async create(workshopData) {
    try {
      await Client.query('BEGIN'); // Inicie a transação

      const workshopId = uuid();

      await Client.query(
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
        await WorkshopTopicsRepository.create(workshopId, topicData);
      }

      await Client.query('COMMIT');

      return true;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    }
  }

  static async findById(id) {
    const { rows } = await Client.query('SELECT * FROM workshops WHERE id = $1;', [id]);

    if (!rows || rows.length === 0) {
      return undefined;
    }

    const workshop = new WorkshopEntity(rows[0]);

    workshop.topics = await WorkshopTopicsRepository.findByWorkshopId(id);

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

  static async update(id, data) {
    try {
      await Client.query('BEGIN'); // Inicie a transação

      await Client.query(
        `UPDATE workshops
        SET title = COALESCE($1,title), description = COALESCE($2, description), category = COALESCE($3, category), difficulty = COALESCE($4, difficulty), image = COALESCE($5, image), start_date = COALESCE($6, start_date), ingredients = COALESCE($7, ingredients), updated_at = $8
        WHERE id = $9;`,
        [
          data.title,
          data.description,
          data.category,
          data.difficulty,
          data.image,
          data.start_date,
          data.ingredients,
          new Date(),
          id,
        ]
      );

      if (data.topics && data.topics.length > 0) {
        const workshopTopics = await WorkshopTopicsRepository.findByWorkshopId(id);

        if (workshopTopics && workshopTopics.length > 0) {
          await Promise.all(
            workshopTopics.map(async (topicWorkshop) => {
              const topic = data.topics.find((topic) => topic.id === topicWorkshop.id);

              if (topic) {
                await WorkshopTopicsRepository.update(topic.id, topic);
              } else {
                await WorkshopTopicsRepository.delete(topicWorkshop.id);
              }

              data.topics = data.topics.filter((topic) => topic.id !== topicWorkshop.id);
            })
          );
        }

        await Promise.all(
          data.topics.map(async (topic) => {
            topic.workshop_id = id;
            await WorkshopTopicsRepository.create(topic);
          })
        );
      } else if (data.topics && data.topics.length === 0) {
        await WorkshopTopicsRepository.deleteByWorkshopId(id);
      }

      await Client.query('COMMIT');

      return await WorkshopRepository.findById(id);
    } catch (error) {
      await Client.query('ROLLBACK');
      throw error;
    }
  }
}
