import BaseController from '../../../../class_base/controller.base.js';
import { CreateRecipesDto } from './create-recipe.dto.js';
import { CreateRecipeService } from './create-recipe.service.js';

export default class CreateRecipeController extends BaseController {
  method = 'POST';
  path = '/';

  async handle(req, res, next) {
    try {
      const data = CreateRecipesDto.parse(req.body);
      data.author_id = req.authUser.id;

      super.send(res, { data: await new CreateRecipeService().execute(data) });
    } catch (err) {
      next(err);
    }
  }
}
