import { z } from 'zod';
import BaseController from '../../../../class_base/controller.base.js';
import { EditRecipeDto } from './edit-recipe.dto.js';
import { EditRecipeService } from './edit-recipe.service.js';

export default class EditRecipeController extends BaseController {
  method = 'PATCH';
  path = '/:id';

  async handle(req, res, next) {
    try {
      const idParser = z.string().uuid();
      const id = idParser.parse(req.params.id);

      const data = EditRecipeDto.parse(req.body);

      super.send(res, { data: await new EditRecipeService().execute(id, data, req.authUser) });
    } catch (err) {
      next(err);
    }
  }
}
