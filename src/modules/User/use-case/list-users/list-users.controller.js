import BaseController from '../../../../class_base/controller.base.js';
import { UserRepository } from '../../repositories/user.repository.js';

export default class ListUsersController extends BaseController {
  method = 'GET';
  path = '/';

  async handle(req, res, next) {
    try {
      const users = await UserRepository.findAll();

      const usersJson = [];

      for (let user of users) {
        usersJson.push(user.toJson());
      }

      super.send(res, { data: usersJson });
    } catch (err) {
      next(err);
    }
  }
}
