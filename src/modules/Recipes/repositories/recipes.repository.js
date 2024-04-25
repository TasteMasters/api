import { Client } from '../../../../database/database.service.js';
import { v4 as uuid } from 'uuid';
import { RecipeEntity } from '../../../entities/recipes.entity.js';
import { RecipeIngredientRepository } from './recipe-ingredients.repository.js';

export class RecipeRepository {
  static async findById(id) {
    const { rows } = await Client.query('SELECT * FROM recipes WHERE id = $1;', [id]);

    if (!rows || rows.length === 0) {
      return undefined;
    }

    const user = new RecipeEntity(rows[0]);
    user.ingredients = await RecipeIngredientRepository.findByRecipeId(user.id);

    return user;
  }

  static async findAll() {
    const { rows } = await Client.query('SELECT * FROM recipes;');

    if (!rows || rows.length === 0) {
      return [];
    }

    const recipes = await Promise.all(
      rows.map(async (row) => {
        const recipe = new RecipeEntity(row);
        recipe.ingredients = await RecipeIngredientRepository.findByRecipeId(recipe.id);

        return recipe;
      })
    );

    return recipes;
  }

  static async delete(id) {
    const recipeDeleted = await Client.query('DELETE FROM recipes WHERE id = $1;', [id]);

    if (recipeDeleted.rowCount === 0) {
      return false;
    }

    return true;
  }

  static async create({ author_id, title, description, ingredients }) {
    try {
      const recipesCreated = await Client.query(
        'INSERT INTO recipes (id, author_id, title, description, created_at) VALUES ($1,$2,$3,$4,$5) RETURNING *;',
        [uuid(), author_id, title, description, new Date()]
      );

      if (!recipesCreated || !recipesCreated.rows || !recipesCreated.rows.length === 0) {
        return undefined;
      }

      const recipe = new RecipeEntity(recipesCreated.rows[0]);

      if (ingredients && ingredients.length > 0) {
        await Promise.all(
          ingredients.map(async (ingredient) => {
            await RecipeIngredientRepository.create({
              recipe_id: recipe.id,
              name: ingredient.name,
              amount: ingredient.amount,
              image: ingredient.image,
            });
          })
        );

        recipe.ingredients = await RecipeIngredientRepository.findByRecipeId(recipe.id);
      }

      return recipe;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, { title, description }) {
    const { rows } = await Client.query(
      'UPDATE recipes SET title = COALESCE($1, title), description = COALESCE($2, description), updated_at = $3 WHERE id = $4 RETURNING *;',
      [title, description, new Date(), id]
    );

    if (!rows || rows.length === 0) {
      return undefined;
    }

    const recipe = new RecipeEntity(rows[0]);

    return recipe;
  }
}
