import { Client } from '../../../../database/database.service.js';
import { v4 as uuid } from 'uuid';
import { WorkshopTopicsEntity } from '../../../entities/workshop-topics.entity.js';

export class WorkshopTopicsRepository {
  static async findById(id) {
    const { rows } = await Client.query('SELECT * FROM workshop_topics WHERE id = $1;', [id]);

    if (!rows || rows.length === 0) {
      return undefined;
    }

    return new WorkshopTopicsEntity(rows[0]);
  }

  static async findByWorkshopId(workshopId) {
    const { rows } = await Client.query('SELECT * FROM workshop_topics WHERE workshop_id = $1;', [workshopId]);

    if (!rows || rows.length === 0) {
      return undefined;
    }

    let topics = [];

    rows.map((row) => topics.push(new WorkshopTopicsEntity(row)));

    return topics;
  }

  static async create(data) {
    const { rows } = await Client.query(
      `INSERT INTO workshop_topics (id, workshop_id, title, estimated_time, description, video_link, completed, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
      [
        uuid(),
        data.workshop_id,
        data.title,
        data.estimated_time,
        data.description,
        data.video_link,
        data.completed,
        new Date(),
      ]
    );

    return new WorkshopTopicsEntity(rows[0]);
  }

  static async delete(id) {
    const topicDeleted = await Client.query('DELETE FROM workshop_topics WHERE id = $1;', [id]);

    if (topicDeleted.rowCount === 0) {
      return false;
    }

    return true;
  }

  static async update(id, data) {
    const { rows } = await Client.query(
      `UPDATE workshop_topics SET title = COALESCE($1, title), estimated_time = COALESCE($2, estimated_time), description = COALESCE($3, description), video_link = COALESCE($4, video_link), completed = COALESCE($5, completed), updated_at = $6
       WHERE id = $7 RETURNING *;`,
      [data.title, data.estimated_time, data.description, data.video_link, data.completed, new Date(), id]
    );

    return new WorkshopTopicsEntity(rows[0]);
  }
}
