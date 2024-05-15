import FindUserController from './use-case/find-user/find-user.controller.js';
import ModuleBase from '../../class_base/module.base.js';
import ListUsersController from './use-case/list-users/list-users.controller.js';
import UpdateUsersController from './use-case/update-user/update-user.controller.js';

export default class UserModule extends ModuleBase {
  basePath = 'users';

  controllers = [new FindUserController(), new ListUsersController(), new UpdateUsersController()];
}
