import ServiceBase from '../../../../class_base/service.base.js';
import { Message } from '../../../../common/messages.js';
import PasswordsNotMatchException from '../../../../exceptions/PasswordsNotMatchException.js';
import UserAlreadyExistsException from '../../../../exceptions/UserAlreadyExistsException.js';
import { UserRepository } from '../../../User/repositories/user.repository.js';
import { JwtService } from '../../jwt.service.js';

export class SignupService extends ServiceBase {
  async execute({ name, email, password, password_confirmation }) {
    const user = await UserRepository.findByEmail(email);

    if (user) {
      throw new UserAlreadyExistsException(Message.USER_ALREADY_EXISTS);
    }

    if (password !== password_confirmation) {
      throw new PasswordsNotMatchException(Message.PASSWORDS_NOT_MATCH);
    }

    const userCreated = await UserRepository.create({
      name,
      email,
      password,
    });

    const jwt = await JwtService.create({
      email: userCreated.email,
    });

    return {
      jwt,
    };
  }
}
