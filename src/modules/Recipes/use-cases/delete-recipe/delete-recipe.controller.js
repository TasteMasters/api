import { z } from 'zod';
import BaseController from '../../../../class_base/controller.base.js';
import { RecipeRepository } from '../../repositories/recipes.repository.js';
import NotFoundException from '../../../../exceptions/NotFoundException.js';
import { Message } from '../../../../common/messages.js';

export default class DeleteRecipeController extends BaseController {
  method = 'DELETE';
  path = '/:id';

  async handle(req, res, next) {
    try {
      const idParser = z.string().uuid();
      const id = idParser.parse(req.params.id);

      if (!(await RecipeRepository.delete(id))) {
        throw new NotFoundException(Message.RECIPE_NOT_FOUND);
      }

      super.send(res);
    } catch (err) {
      next(err);
    }
  }
}
