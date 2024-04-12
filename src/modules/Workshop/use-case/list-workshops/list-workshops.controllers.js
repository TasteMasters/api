import BaseController from '../../../../class_base/controller.base.js';
import { WorkshopRepository } from '../../Repositories/workshop.repository.js'

export default class ListWorshopsController extends BaseController {
  method = 'GET';
  path = '/';

  async handle(req, res, next) {
    try {
      const workshops = await WorkshopRepository.findAll();

      
      if(!workshops){
        return super.send(res, { data: undefined });
      }

      const workshopsJson = [];

      for (let workshop of workshops) {
        workshopsJson.push(workshop.toJson());
      }

      super.send(res, { data: usersJson });
    } catch (err) {
      next(err);
    }
  }
}