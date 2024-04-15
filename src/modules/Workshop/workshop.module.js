import ListWorshopsController from '../Workshop/use-case/list-workshops/list-workshops.controllers.js';
import FindWorshopByIdController from '../Workshop/use-case/find-workshop/find-workshop.controller.js';
import ModuleBase from '../../class_base/module.base.js';

export default class WorkshopModule extends ModuleBase {
  basePath = 'workshops';

  controllers = [new ListWorshopsController(), new FindWorshopByIdController()];
}
