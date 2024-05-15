import ServiceBase from '../../../../class_base/service.base.js';
import { Message } from '../../../../common/messages.js';
import PasswordIncorrectException from '../../../../exceptions/PasswordIncorrectException.js';
import PasswordsNotMatchException from '../../../../exceptions/PasswordsNotMatchException.js';
import { UserRepository } from '../../../User/repositories/user.repository.js';

export class ChangePasswordService extends ServiceBase {
  async execute(user, data) {
    if (!(await user.verifyPassword(data.old_password))) {
      throw new PasswordIncorrectException(Message.PASSWORD_INCORRECT);
    }

    if (data.new_password !== data.confirm_password) {
      throw new PasswordsNotMatchException(Message.PASSWORDS_NOT_MATCH);
    }

    const userUpdatead = await UserRepository.changePassword(user.id, data.new_password);

    return userUpdatead.toJson();
  }
}
