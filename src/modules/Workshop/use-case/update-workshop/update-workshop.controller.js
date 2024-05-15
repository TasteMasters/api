import BaseController from '../../../../class_base/controller.base.js';
import { z } from 'zod';
import { UpdateWorkshopDto } from './update-workshop.dto.js';
import { UpdateWorkshopService } from './update-workshop.service.js';

export default class UpdateWorkshopController extends BaseController {
  method = 'PATCH';
  path = '/:id';

  async handle(req, res, next) {
    try {
      const idParser = z.string().uuid();
      const id = idParser.parse(req.params.id);

      const data = UpdateWorkshopDto.parse(req.body);

      super.send(res, { data: await new UpdateWorkshopService().execute(id, data, req.authUser) });
    } catch (err) {
      next(err);
    }
  }
}
