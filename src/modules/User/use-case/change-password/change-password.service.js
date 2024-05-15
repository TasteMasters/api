import ServiceBase from '../../../../class_base/service.base.js';
import { UserRepository } from '../../../User/repositories/user.repository.js';

export class ChangePasswordService extends ServiceBase {
  async execute(user, data) {
    if (!(await user.verifyPassword(data.old_password))) {
      throw new Error('Old password is incorrect');
    }

    if (data.new_password !== data.confirm_password) {
      throw new Error('Passwords do not match');
    }

    const userUpdatead = await UserRepository.changePassword(user.id, data.new_password);

    return userUpdatead.toJson();
  }
}
