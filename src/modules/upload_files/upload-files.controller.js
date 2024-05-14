import BaseController from '../../class_base/controller.base.js';
import upload from '../../../multer.config.js';

export class UploadFilesController extends BaseController {
  method = 'POST';
  path = '/';

  before = [upload.single('image')];

  async handle(req, res, next) {
    try {
      super.send(res, { data: { id: req.file.filename } });
    } catch (err) {
      next(err);
    }
  }
}
