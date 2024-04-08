import { Client } from '../../../../database/database.service.js';
import { UserEntity } from '../../../entities/user.entity.js';
import { v4 as uuid } from 'uuid';
import BCryptService from '../../Auth/bcrypt.service.js';

export class UserRepository {
  /**
   *
   * @param {string} id
   * @return {UserEntity | undefined}
   */
  static async findById(id) {
    const { rows } = await Client.query('SELECT * FROM users WHERE id = $1;', [id]);

    if (!rows || rows.length === 0) {
      return undefined;
    }

    const user = new UserEntity(rows[0]);

    return user;
  }

  /**
   *
   * @param {string} email
   * @return {UserEntity | undefined}
   */
  static async findByEmail(email) {
    const { rows } = await Client.query('SELECT * FROM users WHERE email = $1;', [email]);

    if (!rows || rows.length === 0) {
      return undefined;
    }

    const user = new UserEntity(rows[0]);

    return user;
  }

  static async findAll() {
    const { rows } = await Client.query('SELECT * FROM users;');

    if (!rows || rows.length === 0) {
      return [];
    }

    let users = [];

    for (let user of rows) {
      users.push(new UserEntity(user));
    }

    return users;
  }

  /**
   * @typedef UserCreate
   * @type {Object}
   * @property {string} name
   * @property {string} email
   * @property {string} password
   */

  /**
   *
   * @param {UserCreate} user
   * @returns {UserEntity | undefined}
   */
  static async create({ name, email, password }) {
    try {
      const userCreated = await Client.query(
        'INSERT INTO users (id, name, email, password, created_at) VALUES ($1,$2,$3,$4,$5) RETURNING *;',
        [uuid(), name, email, await BCryptService.hash(password), new Date()]
      );

      if (!userCreated || !userCreated.rows || !userCreated.rows.length === 0) {
        return undefined;
      }

      const user = new UserEntity(userCreated.rows[0]);

      return user;
    } catch (error) {
      throw error;
    }
  }
}
