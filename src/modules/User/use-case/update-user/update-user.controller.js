import BaseController from '../../../../class_base/controller.base.js';
import { UpdateUserDto } from './update-user.dto.js';
import { UpdateUserService } from './update-user.service.js';
import { z } from 'zod';

export default class UpdateUsersController extends BaseController {
  method = 'PATCH';
  path = '/:id';

  async handle(req, res, next) {
    try {
      const idParser = z.string().uuid();
      const id = idParser.parse(req.params.id);

      const data = UpdateUserDto.parse(req.body);

      super.send(res, { data: await new UpdateUserService().execute(id, data, req.userAuth) });
    } catch (err) {
      next(err);
    }
  }
}
