import ModuleBase from '../../class_base/module.base.js';
import { ListTagsController } from './use-cases/list-tags/list-tags.controller.js';

export default class TagsModule extends ModuleBase {
  basePath = 'tags';
  controllers = [new ListTagsController()];
}
