import ServiceBase from '../../../../class_base/service.base.js';
import { Message } from '../../../../common/messages.js';
import NotFoundException from '../../../../exceptions/NotFoundException.js';
import { RecipeRepository } from '../../repositories/recipes.repository.js';

export class EditRecipeService extends ServiceBase {
  async execute(recipe_id, data) {
    const recipe = await RecipeRepository.findById(recipe_id);

    if (!recipe) {
      throw new NotFoundException(Message.RECIPE_NOT_FOUND);
    }

    const recipeEdited = await RecipeRepository.update(recipe_id, data);

    return recipeEdited.toJson();
  }
}
