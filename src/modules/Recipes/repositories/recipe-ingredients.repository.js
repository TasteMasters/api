import { Client } from '../../../../database/database.service.js';
import { RecipeIngredientEntity } from '../../../entities/recipe_ingredient.entity.js';

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
}
