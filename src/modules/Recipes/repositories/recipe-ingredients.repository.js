import { Client } from '../../../../database/database.service.js';
import { RecipeIngredientEntity } from '../../../entities/recipe_ingredient.entity.js';
import { v4 as uuid } from 'uuid';

export class RecipeIngredientRepository {
  static async findById(id) {
    const { rows } = await Client.query('SELECT * FROM recipe_ingredients WHERE id = $1;', [id]);

    if (!rows || rows.length === 0) {
      return undefined;
    }

    const user = new RecipeEntity(rows[0]);

    return user;
  }

  static async findByRecipeId(recipeId) {
    const { rows } = await Client.query('SELECT * FROM recipe_ingredients WHERE recipe_id = $1;', [recipeId]);

    if (!rows || rows.length === 0) {
      return [];
    }

    return rows.map((row) => new RecipeIngredientEntity(row));
  }

  static async create({ recipe_id, name, amount, image }) {
    const recipeIngredientCreated = await Client.query(
      'INSERT INTO recipe_ingredients (id, recipe_id, name, amount, image, created_at) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;',
      [uuid(), recipe_id, name, amount, image, new Date()]
    );

    if (!recipeIngredientCreated || !recipeIngredientCreated.rows || !recipeIngredientCreated.rows.length === 0) {
      return undefined;
    }

    const recipeIngredient = new RecipeIngredientEntity(recipeIngredientCreated.rows[0]);

    return recipeIngredient;
  }
}
