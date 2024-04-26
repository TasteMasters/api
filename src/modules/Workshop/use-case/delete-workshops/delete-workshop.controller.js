import { z } from 'zod';
import BaseController from '../../../../class_base/controller.base.js';
import NotFoundException from '../../../../exceptions/NotFoundException.js';
import { Message } from '../../../../common/messages.js';
import { WorkshopRepository } from '../../Repositories/workshop.repository.js';

export default class DeleteWorshopController extends BaseController {
  method = 'DELETE';
  path = '/:id';

  async handle(req, res, next) {
    try {
      const idParser = z.string().uuid();
      const idResult = idParser.parse(req.params.id);

      if (!idResult) {
        throw new NotFoundException(Message.INVALID_ID);
      }

      const workshop = await WorkshopRepository.delete(idResult);

      if (!workshop) {
        throw new NotFoundException(Message.DELETE_ERROR);
      }

      super.send(res, {data: Message.DELETE_EVENT_SUCCESS});
    } catch (err) {
      next(err);
    }
  }
}
