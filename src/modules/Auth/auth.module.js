import ModuleBase from '../../class_base/module.base.js';
import SignInController from './use-case/SignIn/signIn.controller.js';
import SignupController from './use-case/Signup/signup.controller.js';

export default class AuthModule extends ModuleBase {
  basePath = 'auth';

  controllers = [new SignInController(), new SignupController()];
}
