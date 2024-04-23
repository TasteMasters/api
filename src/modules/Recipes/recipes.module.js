import ModuleBase from '../../class_base/module.base.js';
import CreateRecipeController from './use-cases/create-recipe/create-recipe.controller.js';
import FindRecipeController from './use-cases/find-recipe/find-recipe.controller.js';
import ListRecipesController from './use-cases/list-recipes/list-recipes.controller.js';

export default class RecipesModule extends ModuleBase {
  basePath = 'recipes';

  controllers = [new CreateRecipeController(), new ListRecipesController(), new FindRecipeController()];
}
