import BaseController from '../../class_base/controller.base.js';
import multer from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'node:path';

export class UploadFilesController extends BaseController {
  method = 'POST';
  path = '/';
  upload;

  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, uuid() + extname(file.originalname));
    },
  });

  constructor(method = 'GET', path = '/', authenticated = true) {
    super(method, path, authenticated);

    this.upload = multer({ dest: 'uploads/', storage: this.storage });
  }

  register() {
    this.router.post(this.path, this.upload.single('image'), this.middleware.bind(this));

    return this.router;
  }

  async handle(req, res, next) {
    try {
      super.send(res, { data: { id: req.file.filename } });
    } catch (err) {
      next(err);
    }
  }
}
