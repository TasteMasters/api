import { Router } from 'express';
import UserModule from './User/user.module.js';
import AuthModule from './Auth/auth.module.js';
import WorkshopModule from './Workshop/workshop.module.js';

export default function registerModules() {
  const router = Router();

  const modules = [new UserModule(), new AuthModule(), new WorkshopModule()];

  modules.forEach((module) => {
    router.use(`/v1`, module.init());
  });

  return router;
}
