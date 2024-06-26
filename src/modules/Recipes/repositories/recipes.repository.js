import { Client } from '../../../../database/database.service.js';
import { v4 as uuid } from 'uuid';
import { RecipeEntity } from '../../../entities/recipes.entity.js';
import { RecipeIngredientRepository } from './recipe-ingredients.repository.js';
import { RecipeTagsRepository } from './recipe-tags.repository.js';
import { RecipeImagesRepository } from './recipe-image.repository.js';

export class RecipeRepository {
  static async findById(id) {
    const { rows } = await Client.query('SELECT * FROM recipes WHERE id = $1;', [id]);

    if (!rows || rows.length === 0) {
      return undefined;
    }

    const user = new RecipeEntity(rows[0]);
    user.ingredients = await RecipeIngredientRepository.findByRecipeId(user.id);
    user.tags = await RecipeTagsRepository.findByRecipeId(user.id);
    user.images = await RecipeImagesRepository.findByRecipeId(user.id);

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
        recipe.tags = await RecipeTagsRepository.findByRecipeId(recipe.id);
        recipe.images = await RecipeImagesRepository.findByRecipeId(recipe.id);

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

  static async create({ author_id, title, description, ingredients, tags, images }) {
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

        if (tags && tags.length > 0) {
          tags.map(async (tag) => {
            await RecipeTagsRepository.create({
              recipe_id: recipe.id,
              tag_id: tag,
            });
          });
        }

        if (images && images.length > 0) {
          images.map(async (image) => {
            await RecipeImagesRepository.create({
              recipe_id: recipe.id,
              image: image,
            });
          });
        }

        recipe.ingredients = await RecipeIngredientRepository.findByRecipeId(recipe.id);
        recipe.tags = await RecipeTagsRepository.findByRecipeId(recipe.id);
        recipe.images = await RecipeImagesRepository.findByRecipeId(recipe.id);
      }

      return recipe;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, { title, description, ingredients, tags, images }) {
    const { rows } = await Client.query(
      'UPDATE recipes SET title = COALESCE($1, title), description = COALESCE($2, description), updated_at = $3 WHERE id = $4 RETURNING *;',
      [title, description, new Date(), id]
    );

    if (!rows || rows.length === 0) {
      return undefined;
    }

    if (ingredients && ingredients.length > 0) {
      const recipeIngredients = await RecipeIngredientRepository.findByRecipeId(id);

      await Promise.all(
        recipeIngredients.map(async (recipeIngredient) => {
          const ingredient = ingredients.find((ingredient) => ingredient.id === recipeIngredient.id);

          if (ingredient) {
            await RecipeIngredientRepository.update(ingredient.id, {
              name: ingredient.name,
              amount: ingredient.amount,
              image: ingredient.image,
            });
          } else {
            await RecipeIngredientRepository.delete(recipeIngredient.id);
          }

          ingredients = ingredients.filter((ingredient) => ingredient.id !== recipeIngredient.id);
        })
      );

      await Promise.all(
        ingredients.map(async (ingredient) => {
          await RecipeIngredientRepository.create({
            recipe_id: id,
            name: ingredient.name,
            amount: ingredient.amount,
            image: ingredient.image,
          });
        })
      );
    }

    if (tags && tags.length > 0) {
      const recipeTags = await RecipeTagsRepository.findByRecipeId(id);

      await Promise.all(
        recipeTags.map(async (recipeTag) => {
          const tag = tags.find((tag) => tag === recipeTag.id);

          if (!tag) {
            await RecipeTagsRepository.delete(recipeTag.id);
          }

          tags = tags.filter((tag) => tag !== recipeTag.id);
        })
      );

      await Promise.all(
        tags.map(async (tag) => {
          await RecipeTagsRepository.create({
            recipe_id: id,
            tag_id: tag,
          });
        })
      );
    }

    if (images && images.length > 0) {
      const recipeImages = await RecipeImagesRepository.findByRecipeId(id);

      await Promise.all(
        recipeImages.map(async (recipeImage) => {
          const image = images.find((image) => image === recipeImage.id);

          if (!image) {
            await RecipeImagesRepository.delete(recipeImage.id);
          }

          images = images.filter((image) => image !== recipeImage.id);
        })
      );

      await Promise.all(
        images.map(async (image) => {
          await RecipeImagesRepository.create({
            recipe_id: id,
            image: image,
          });
        })
      );
    }

    const recipe = new RecipeEntity(rows[0]);
    recipe.ingredients = await RecipeIngredientRepository.findByRecipeId(recipe.id);
    recipe.tags = await RecipeTagsRepository.findByRecipeId(recipe.id);
    recipe.images = await RecipeImagesRepository.findByRecipeId(recipe.id);

    return recipe;
  }
}
