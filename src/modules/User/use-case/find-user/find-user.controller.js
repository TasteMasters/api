import { z } from 'zod';
import BaseController from '../../../../class_base/controller.base.js';
import { UserRepository } from '../../repositories/user.repository.js';
import NotFoundException from '../../../../exceptions/NotFoundException.js';
import { Message } from '../../../../common/messages.js';

export default class FindUserController extends BaseController {
  method = 'GET';
  path = '/:id';

  async handle(req, res, next) {
    try {
      const idParser = z.string().uuid();
      const id = idParser.parse(req.params.id);

      const user = await UserRepository.findById(id);

      if (!user) {
        throw new NotFoundException(Message.USER_NOT_FOUND);
      }

      super.send(res, { data: user.toJson() });
    } catch (err) {
      next(err);
    }
  }
}
