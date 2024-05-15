import BaseController from '../../../../class_base/controller.base.js';
import { ChangePasswordService } from './change-password.service.js';
import { ChangePasswordDto } from './change-password.dto.js';

export default class ChangePasswordController extends BaseController {
  method = 'PATCH';
  path = '/change-password/';

  async handle(req, res, next) {
    try {
      const data = ChangePasswordDto.parse(req.body);

      super.send(res, { data: await new ChangePasswordService().execute(req.authUser, data) });
    } catch (err) {
      next(err);
    }
  }
}
