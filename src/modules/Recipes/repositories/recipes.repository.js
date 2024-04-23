import { Client } from '../../../../database/database.service.js';
import { v4 as uuid } from 'uuid';
import { RecipeEntity } from '../../../entities/recipes.entity.js';

export class RecipeRepository {
  static async findById(id) {
    const { rows } = await Client.query('SELECT * FROM recipes WHERE id = $1;', [id]);

    if (!rows || rows.length === 0) {
      return undefined;
    }

    const user = new RecipeEntity(rows[0]);

    return user;
  }

  static async findAll() {
    const { rows } = await Client.query('SELECT * FROM recipes;');

    if (!rows || rows.length === 0) {
      return [];
    }

    let recipes = [];

    for (let recipe of rows) {
      recipes.push(new RecipeEntity(recipe));
    }

    return recipes;
  }

  static async delete(id) {
    const recipeDeleted = await Client.query('DELETE FROM recipes WHERE id = $1;', [id]);

    if (recipeDeleted.rowCount === 0) {
      return false;
    }

    return true;
  }

  static async create({ author_id, title, description }) {
    try {
      const recipesCreated = await Client.query(
        'INSERT INTO recipes (id, author_id, title, description, created_at) VALUES ($1,$2,$3,$4,$5) RETURNING *;',
        [uuid(), author_id, title, description, new Date()]
      );

      if (!recipesCreated || !recipesCreated.rows || !recipesCreated.rows.length === 0) {
        return undefined;
      }

      const recipe = new RecipeEntity(recipesCreated.rows[0]);

      return recipe;
    } catch (error) {
      throw error;
    }
  }
}