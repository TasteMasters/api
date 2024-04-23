import ModuleBase from '../../class_base/module.base.js';
import CreateRecipeController from './use-cases/create-recipe/create-recipe.controller.js';

export default class RecipesModule extends ModuleBase {
  basePath = 'recipes';

  controllers = [new CreateRecipeController()];
}
