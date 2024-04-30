import BaseController from '../../../../class_base/controller.base.js';
import { Message } from '../../../../common/messages.js';
import { SignupDto } from './signup.dto.js';
import { SignupService } from './signup.service.js';

export default class SignupController extends BaseController {
  method = 'POST';
  path = '/signup';
  authenticated = false;

  async handle(req, res, next) {
    try {
      const data = SignupDto.parse(req.body);

      const signup = await new SignupService().execute(data);

      res.cookie('token', signup.jwt, { maxAge: 1000 * 60 * 10, httpOnly: false });

      super.send(res, {
        data: {
          message: Message.SIGNUP_SUCCESS,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
