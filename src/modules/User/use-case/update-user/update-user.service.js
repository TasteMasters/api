import ServiceBase from '../../../../class_base/service.base.js';
import { Message } from '../../../../common/messages.js';
import { UserRepository } from '../../../User/repositories/user.repository.js';

export class UpdateUserService extends ServiceBase {
  async execute(id, data) {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(Message.USER_NOT_FOUND);
    }

    const userUpdatead = await UserRepository.update(id, data);

    return userUpdatead.toJson();
  }
}
