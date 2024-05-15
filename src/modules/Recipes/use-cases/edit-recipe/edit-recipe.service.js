import ServiceBase from '../../../../class_base/service.base.js';
import { Message } from '../../../../common/messages.js';
import NotFoundException from '../../../../exceptions/NotFoundException.js';
import UnauthorizedException from '../../../../exceptions/UnauthorizedException.js';
import { RecipeRepository } from '../../repositories/recipes.repository.js';

export class EditRecipeService extends ServiceBase {
  async execute(recipe_id, data, user) {
    const recipe = await RecipeRepository.findById(recipe_id);

    if (!recipe) {
      throw new NotFoundException(Message.RECIPE_NOT_FOUND);
    }

    if (recipe.author_id !== user.id) {
      throw new UnauthorizedException(Message.UNAUTHORIZED);
    }

    const recipeEdited = await RecipeRepository.update(recipe_id, data);

    return recipeEdited.toJson();
  }
}
