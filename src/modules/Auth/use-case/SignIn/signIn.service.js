import ServiceBase from '../../../../class_base/service.base.js';
import { Message } from '../../../../common/messages.js';
import EmailOrPasswordIncorrectException from '../../../../exceptions/EmailOrPasswordIncorrectException.js';
import { UserRepository } from '../../../User/repositories/user.repository.js';
import { JwtService } from '../../jwt.service.js';

export class SignInService extends ServiceBase {
  async execute({ email, password }) {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new EmailOrPasswordIncorrectException(Message.EMAIL_OR_PASSWORD_INCORRECT);
    }

    if (!(await user.verifyPassword(password))) {
      throw new EmailOrPasswordIncorrectException(Message.EMAIL_OR_PASSWORD_INCORRECT);
    }

    const jwt = await JwtService.create({
      id: user.id,
    });

    return {
      jwt,
    };
  }
}
