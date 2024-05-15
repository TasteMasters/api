import { Client } from '../../../../database/database.service.js';
import { UserEntity } from '../../../entities/user.entity.js';
import { v4 as uuid } from 'uuid';
import BCryptService from '../../Auth/bcrypt.service.js';

export class UserRepository {
  static async findById(id) {
    const { rows } = await Client.query('SELECT * FROM users WHERE id = $1;', [id]);

    if (!rows || rows.length === 0) {
      return undefined;
    }

    const user = new UserEntity(rows[0]);

    return user;
  }

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

  static async update(id, data) {
    const userUpdated = await Client.query(
      'UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), experience = COALESCE($3, experience), photo = COALESCE($4, photo), specialization = COALESCE($5, specialization), pinterest = COALESCE($6, pinterest), linkedin = COALESCE($7, linkedin), instagram = COALESCE($8, instagram), updated_at = $9 WHERE id = $10 RETURNING *;',
      [
        data.name,
        data.email,
        data.experience,
        data.photo,
        data.specialization,
        data.pinterest,
        data.linkedin,
        data.instagram,
        new Date(),
        id,
      ]
    );

    if (!userUpdated || !userUpdated.rows || !userUpdated.rows.length === 0) {
      return undefined;
    }

    const user = new UserEntity(userUpdated.rows[0]);

    return user;
  }

  static async changePassword(id, password) {
    const userUpdated = await Client.query(
      'UPDATE users SET password = $1, updated_at = $2 WHERE id = $3 RETURNING *;',
      [await BCryptService.hash(password), new Date(), id]
    );

    if (!userUpdated || !userUpdated.rows || !userUpdated.rows.length === 0) {
      return undefined;
    }

    const user = new UserEntity(userUpdated.rows[0]);

    return user;
  }
}
