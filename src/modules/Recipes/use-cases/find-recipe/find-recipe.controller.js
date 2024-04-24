import { z } from 'zod';
import BaseController from '../../../../class_base/controller.base.js';
import { Message } from '../../../../common/messages.js';
import { RecipeRepository } from '../../repositories/recipes.repository.js';
import NotFoundException from '../../../../exceptions/NotFoundException.js';

export default class FindRecipeController extends BaseController {
  method = 'GET';
  path = '/:id';

  async handle(req, res, next) {
    try {
      const idParser = z.string().uuid();
      const id = idParser.parse(req.params.id);

      const recipe = await RecipeRepository.findById(id);

      if (!recipe) {
        throw new NotFoundException(Message.RECIPE_NOT_FOUND);
      }

      super.send(res, { data: recipe.toJson() });
    } catch (err) {
      next(err);
    }
  }
}
