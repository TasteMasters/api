import { v4 as uuid } from 'uuid';
import { Client } from '../../../../database/database.service.js';
import { RecipeImagesEntity } from '../../../entities/recipe_images.entity.js';

export class RecipeImagesRepository {
  static async findById(id) {
    const { rows } = await Client.query('SELECT * FROM recipe_images WHERE id = $1;', [id]);

    if (!rows || rows.length === 0) {
      return undefined;
    }

    const user = new RecipeImagesEntity(rows[0]);

    return user;
  }

  static async findByRecipeId(recipeId) {
    const { rows } = await Client.query('SELECT * FROM recipe_images WHERE recipe_id = $1;', [recipeId]);

    if (!rows || rows.length === 0) {
      return [];
    }

    return rows.map((row) => new RecipeImagesEntity(row));
  }

  static async create({ recipe_id, image }) {
    const recipeImageCreated = await Client.query(
      'INSERT INTO recipe_images (id, recipe_id, image, created_at) VALUES ($1,$2,$3,$4) RETURNING *;',
      [uuid(), recipe_id, image, new Date()]
    );

    if (!recipeImageCreated || !recipeImageCreated.rows || !recipeImageCreated.rows.length === 0) {
      return undefined;
    }

    const recipeImage = new RecipeImagesEntity(recipeImageCreated.rows[0]);

    return recipeImage;
  }

  static async delete(id) {
    const recipeImageDeleted = await Client.query('DELETE FROM recipe_images WHERE id = $1;', [id]);

    if (recipeImageDeleted.rowCount === 0) {
      return false;
    }

    return true;
  }
}
