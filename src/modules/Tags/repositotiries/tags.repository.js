import { Client } from '../../../../database/database.service.js';
import { TagsEntity } from '../../../entities/tags.entity.js';

export class TagsRepository {
  static async findById(id) {
    const { rows } = await Client.query('SELECT * FROM tags WHERE id = $1;', [id]);

    if (!rows || rows.length === 0) {
      return undefined;
    }

    return new TagsEntity(rows[0]);
  }

  static async findAll() {
    const { rows } = await Client.query('SELECT * FROM tags;');

    if (!rows || rows.length === 0) {
      return [];
    }

    return rows.map((row) => new TagsEntity(row));
  }

  static async delete(id) {
    const tagDeleted = await Client.query('DELETE FROM tags WHERE id = $1;', [id]);

    if (tagDeleted.rowCount === 0) {
      return false;
    }

    return true;
  }

  static async create({ name }) {
    try {
      const tagsCreated = await Client.query('INSERT INTO tags (id, name, created_at) VALUES ($1,$2,$3) RETURNING *;', [
        uuid(),
        name,
        new Date(),
      ]);

      if (!tagsCreated || !tagsCreated.rows || !tagsCreated.rows.length === 0) {
        return undefined;
      }

      return new TagsEntity(tagsCreated.rows[0]);
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  static async update({ id, name }) {
    try {
      const tagsUpdated = await Client.query(
        'UPDATE tags SET name = COALESCE($1,name), updated_at = $2 WHERE id = $3 RETURNING *;',
        [name, new Date(), id]
      );

      if (!tagsUpdated || !tagsUpdated.rows || !tagsUpdated.rows.length === 0) {
        return undefined;
      }

      return new TagsEntity(tagsUpdated.rows[0]);
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}
