import ServiceBase from '../../../../class_base/service.base.js';
import { Message } from '../../../../common/messages.js';
import NotFoundException from '../../../../exceptions/NotFoundException.js';
import { UserRepository } from '../../../User/repositories/user.repository.js';
import { RecipeRepository } from '../../repositories/recipes.repository.js';

export class CreateRecipeService extends ServiceBase {
  async execute({ author_id, title, description, ingredients }) {
    const user = await UserRepository.findById(author_id);

    if (!user) {
      throw new NotFoundException(Message.USER_NOT_FOUND);
    }

    const recipe = await RecipeRepository.create({
      author_id,
      title,
      description,
      ingredients,
    });

    return recipe.toJson();
  }
}
