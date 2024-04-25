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
    try {
      await Client.query('DELETE FROM workshops WHERE id = $1;', [id]);
    } catch (error) {
      throw error;
    }
  }
}
