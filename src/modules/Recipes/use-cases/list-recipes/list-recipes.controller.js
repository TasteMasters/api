import BaseController from '../../../../class_base/controller.base.js';
import { RecipeRepository } from '../../repositories/recipes.repository.js';

export default class ListRecipesController extends BaseController {
  method = 'GET';
  path = '/';

  async handle(req, res, next) {
    try {
      const recipes = await RecipeRepository.findAll();

      const recipesJson = [];

      for (let recipe of recipes) {
        recipesJson.push(recipe.toJson());
      }

      super.send(res, { data: recipesJson });
    } catch (err) {
      next(err);
    }
  }
}
