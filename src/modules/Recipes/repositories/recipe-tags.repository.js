import { Client } from '../../../../database/database.service.js';
import { RecipeTagsEntity } from '../../../entities/recipe_tags.entity.js';
import { v4 as uuid } from 'uuid';
import { TagsRepository } from '../../tags/repositotiries/tags.repository.js';

export class RecipeTagsRepository {
  static async findById(id) {
    const { rows } = await Client.query('SELECT * FROM recipe_tags WHERE id = $1;', [id]);

    if (!rows || rows.length === 0) {
      return undefined;
    }

    return new RecipeTagsEntity(rows[0]);
  }

  static async findAll() {
    const { rows } = await Client.query('SELECT * FROM recipe_tags;');

    if (!rows || rows.length === 0) {
      return [];
    }

    return rows.map((row) => new RecipeTagsEntity(row));
  }

  static async findByRecipeId(recipe_id) {
    const { rows } = await Client.query('SELECT * FROM recipe_tags WHERE recipe_id = $1;', [recipe_id]);

    if (!rows || rows.length === 0) {
      return [];
    }

    const recipeTags = await Promise.all(
      await rows.map(async (row) => {
        let tag = new RecipeTagsEntity(row);
        let tagFinded = await TagsRepository.findById(row.tag_id);
        tag.tag = tagFinded.name;
        return tag;
      })
    );

    return recipeTags;
  }

  static async findByTagId(tag_id) {
    const { rows } = await Client.query('SELECT * FROM recipe_tags WHERE tag_id = $1;', [tag_id]);

    if (!rows || rows.length === 0) {
      return [];
    }

    return rows.map((row) => new RecipeTagsEntity(row));
  }

  static async delete(id) {
    const recipeTagDeleted = await Client.query('DELETE FROM recipe_tags WHERE id = $1;', [id]);

    if (recipeTagDeleted.rowCount === 0) {
      return false;
    }

    return true;
  }

  static async create({ recipe_id, tag_id }) {
    try {
      const recipeTagsCreated = await Client.query(
        'INSERT INTO recipe_tags (id, recipe_id, tag_id, created_at) VALUES ($1,$2,$3,$4) RETURNING *;',
        [uuid(), recipe_id, tag_id, new Date()]
      );

      if (!recipeTagsCreated || !recipeTagsCreated.rows || !recipeTagsCreated.rows.length === 0) {
        return undefined;
      }

      return new RecipeTagsEntity(recipeTagsCreated.rows[0]);
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}
