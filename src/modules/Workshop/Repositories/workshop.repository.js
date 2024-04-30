import { Client } from '../../../../database/database.service.js';
import { WorkshopEntity } from '../../../entities/workshop.entity.js';

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

  static async create(workshopData, topicsData, imagePath) {
    const client = await Client.connect();

    try {
      await client.query('BEGIN');

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
          imagePath,
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
        const idTopic = uuid();

        await client.query(
          `INSERT INTO workshop_topics (id, workshop_id, title, estimated_time, description, video_link, completed, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
          [
            idTopic,
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

  static async update(id, workshopData, topicsData, imagePath) {
    const client = await Client.connect();

    try {
      await client.query('BEGIN');

      await client.query(
        `UPDATE workshops
         SET title = $1, 
             description = $2, 
             category = $3, 
             difficulty = $4, 
             image = $5, 
             start_date = $6, 
             creator_id = $7, 
             creator_name = $8, 
             creator_experience = $9, 
             ingredients = $10,
             updated_at = $11
         WHERE id = $12;`,
        [
          workshopData.title,
          workshopData.description,
          workshopData.category,
          workshopData.difficulty,
          imagePath,
          workshopData.start_date,
          workshopData.creator_id,
          workshopData.creator_name,
          workshopData.creator_experience,
          workshopData.ingredients,
          new Date(),
          id,
        ]
      );

      await client.query(
        `DELETE FROM workshop_topics
         WHERE workshop_id = $1;`,
        [id]
      );

      for (const topicData of topicsData) {
        const idTopic = uuid();

        await client.query(
          `INSERT INTO workshop_topics (id, workshop_id, title, estimated_time, description, video_link, completed, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
          [
            idTopic,
            id,
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
      console.error('Erro ao atualizar workshop e tópicos:', error);
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

    return workshop;
  }
  /* Deletes a workshop from the database by its ID.
   * @param {number} id - The ID of the workshop to delete.
   * @returns {Promise<void>} A Promise that resolves when the workshop is successfully deleted.
   */
  static async delete(id) {
    const client = await Client.connect();

    try {
      await client.query('BEGIN'); // Inicia a transação

      // Exclui o workshop
      await client.query('DELETE FROM workshops WHERE id = $1;', [id]);

      // Exclui os tópicos relacionados ao workshop
      await client.query('DELETE FROM workshop_topics WHERE workshop_id = $1;', [id]);

      await client.query('COMMIT'); // Confirma a transação

      return true;
    } catch (error) {
      await client.query('ROLLBACK'); // Desfaz a transação em caso de erro
      console.error('Erro ao excluir workshop e tópicos:', error);
      throw error;
    } finally {
      client.release(); // Libera o cliente do pool de conexões
    }
  }

  static async getImagePath(id) {
    const client = await Client.connect();

    try {
      const image = await client.query('SELECT image FROM workshops WHERE id = $1;', [id]);
      return image;
    } catch (err) {
      throw new err();
    }
  }
}

/* uploads/1714500835176.jpg */
