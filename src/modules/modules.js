import { Router } from 'express';
import UserModule from './User/user.module.js';
import AuthModule from './Auth/auth.module.js';

export default function registerModules() {
  const router = Router();

  const modules = [new UserModule(), new AuthModule()];

  modules.forEach((module) => {
    router.use(`/v1`, module.init());
  });

  return router;
}
