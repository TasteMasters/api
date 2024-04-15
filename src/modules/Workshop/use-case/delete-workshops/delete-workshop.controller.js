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
      const idResult = idParser.safeParse(req.params.id);

      if (!idResult.success) {
        throw new NotFoundException(Message.INVALID_ID);
      }

      const workshop = await WorkshopRepository.delete(idResult.data);

      if (!workshop) {
        throw new NotFoundException(Message.DELETE_ERROR);
      }

      super.send(res);
    } catch (err) {
      next(err);
    }
  }
}
