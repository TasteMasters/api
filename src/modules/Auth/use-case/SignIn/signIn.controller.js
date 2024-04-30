import BaseController from '../../../../class_base/controller.base.js';
import { Message } from '../../../../common/messages.js';
import { SignInDto } from './signIn.dto.js';
import { SignInService } from './signIn.service.js';

export default class SignInController extends BaseController {
  method = 'POST';
  path = '/signin';
  authenticated = false;

  async handle(req, res, next) {
    try {
      const data = SignInDto.parse(req.body);

      const signin = await new SignInService().execute(data);

      res.cookie('token', signin.jwt, { maxAge: 1000 * 60 * 10, httpOnly: false });

      super.send(res, {
        data: {
          message: Message.SIGNIN_SUCCESS,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
