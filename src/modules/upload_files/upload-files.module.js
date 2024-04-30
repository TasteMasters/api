import ModuleBase from '../../class_base/module.base.js';
import { UploadFilesController } from './upload-files.controller.js';

export default class UploadFilesModule extends ModuleBase {
  basePath = 'upload-files';

  controllers = [new UploadFilesController()];
}
