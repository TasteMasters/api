import { z } from 'zod';
import BaseController from '../../../../class_base/controller.base.js';
import NotFoundException from '../../../../exceptions/NotFoundException.js';
import { Message } from '../../../../common/messages.js';
import { WorkshopRepository } from '../../Repositories/workshop.repository.js';

export default class FindUserWorshopsController extends BaseController {
  method = 'GET';
  path = '/user_workshops';

  async handle(req, res, next) {
    try {
      const workshops = await WorkshopRepository.findUserWorkshops(req.authUser.id);

      if (!workshops) {
        return super.send(res, { data: [] });
      }

      const workshopsJson = [];

      for (let workshop of workshops) {
        workshopsJson.push(workshop.toJson());
      }

      super.send(res, { data: workshopsJson });
    } catch (err) {
      next(err);
    }
  }
}
