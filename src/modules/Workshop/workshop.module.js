import ListWorshopsController from '../Workshop/use-case/list-workshops/list-workshops.controllers.js';
import CreateWorkshopController from '../Workshop/use-case/create-workshop/create-workshop.controller.js';
import ModuleBase from '../../class_base/module.base.js';

export default class WorkshopModule extends ModuleBase {
  basePath = 'workshops';

  controllers = [new ListWorshopsController(), new CreateWorkshopController()];
}
