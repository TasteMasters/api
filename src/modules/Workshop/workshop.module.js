import ListWorshopsController from '../Workshop/use-case/list-workshops/list-workshops.controllers.js';
import CreateWorkshopController from '../Workshop/use-case/create-workshop/create-workshop.controller.js';
import FindWorshopByIdController from '../Workshop/use-case/find-workshop/find-workshop.controller.js';
import DeleteWorshopController from '../Workshop/use-case/delete-workshops/delete-workshop.controller.js';
import UpdateWorkshopController from '../Workshop/use-case/edit-workshop/edit-workshop.controller.js'
import ModuleBase from '../../class_base/module.base.js';

export default class WorkshopModule extends ModuleBase {
  basePath = 'workshops';
  controllers = [new ListWorshopsController(), new FindWorshopByIdController(), new CreateWorkshopController(), new DeleteWorshopController(), new UpdateWorkshopController()];

}
