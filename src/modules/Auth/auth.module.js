import ModuleBase from '../../class_base/module.base.js';
import SignInController from './use-case/SignIn/signIn.controller.js';

export default class AuthModule extends ModuleBase {
  basePath = 'auth';

  controllers = [new SignInController()];
}
