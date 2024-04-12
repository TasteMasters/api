import ListWorshopsController from '../Workshop/use-case/list-workshops/list-workshops.controllers.js'
import ModuleBase from '../../class_base/module.base.js';

export default class WorkshopModule extends ModuleBase {
  basePath = 'workshops';

  controllers = [new ListWorshopsController()];
}
