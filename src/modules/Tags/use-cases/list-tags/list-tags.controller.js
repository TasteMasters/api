import BaseController from '../../../../class_base/controller.base.js';
import { TagsRepository } from '../../repositotiries/tags.repository.js';

export class ListTagsController extends BaseController {
  method = 'GET';
  path = '/';

  async handle(req, res, next) {
    try {
      const tags = await TagsRepository.findAll();

      if (!tags) {
        return super.send(res, { data: [] });
      }

      const tagsJson = [];

      for (let tag of tags) {
        tagsJson.push(tag.toJson());
      }

      super.send(res, { data: tagsJson });
    } catch (err) {
      next(err);
    }
  }
}
