import { Router } from 'express';
import UserModule from './User/user.module.js';
import AuthModule from './Auth/auth.module.js';
import WorkshopModule from './Workshop/workshop.module.js';
import RecipesModule from './Recipes/recipes.module.js';
import TagsModule from './Tags/tags.module.js';
import UploadFilesModule from './upload_files/upload-files.module.js';

export default function registerModules() {
  const router = Router();

  const modules = [
    new UserModule(),
    new AuthModule(),
    new WorkshopModule(),
    new RecipesModule(),
    new TagsModule(),
    new UploadFilesModule(),
  ];

  modules.forEach((module) => {
    router.use(`/v1`, module.init());
  });

  return router;
}
