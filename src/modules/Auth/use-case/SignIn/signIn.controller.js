import BaseController from '../../../../class_base/controller.base.js';
import { SignInDto } from './signIn.dto.js';
import { SignInService } from './signIn.service.js';

export default class SignInController extends BaseController {
  method = 'POST';
  path = '/signin';
  authenticated = false;

  async handle(req, res, next) {
    try {
      const data = SignInDto.parse(req.body);

      super.send(res, { data: await new SignInService().execute(data) });
    } catch (err) {
      next(err);
    }
  }
}
