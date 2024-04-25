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

  static async update(id, { name, amount, image }) {
    const recipeIngredientUpdated = await Client.query(
      'UPDATE recipe_ingredients SET name = COALESCE($1,name), amount = COALESCE($2,amount), image = COALESCE($3,image), updated_at = $4 WHERE id = $5 RETURNING *;',
      [name, amount, image, new Date(), id]
    );

    if (!recipeIngredientUpdated || !recipeIngredientUpdated.rows || !recipeIngredientUpdated.rows.length === 0) {
      return undefined;
    }

    const recipeIngredient = new RecipeIngredientEntity(recipeIngredientUpdated.rows[0]);

    return recipeIngredient;
  }

  static async delete(id) {
    const recipeIngredientDeleted = await Client.query('DELETE FROM recipe_ingredients WHERE id = $1;', [id]);

    if (recipeIngredientDeleted.rowCount === 0) {
      return false;
    }

    return true;
  }
}
