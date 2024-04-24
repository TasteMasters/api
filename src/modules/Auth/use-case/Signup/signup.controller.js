import BaseController from '../../../../class_base/controller.base.js';
import { SignupDto } from './signup.dto.js';
import { SignupService } from './signup.service.js';

export default class SignupController extends BaseController {
  method = 'POST';
  path = '/signup';
  authenticated = false;

  async handle(req, res, next) {
    try {
      const data = SignupDto.parse(req.body);

      super.send(res, { data: await new SignupService().execute(data) });
    } catch (err) {
      next(err);
    }
  }
}
