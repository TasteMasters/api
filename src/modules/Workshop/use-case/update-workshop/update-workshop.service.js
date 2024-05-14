import ServiceBase from '../../../../class_base/service.base.js';
import { Message } from '../../../../common/messages.js';
import { WorkshopRepository } from '../../Repositories/workshop.repository.js';

export class UpdateWorkshopService extends ServiceBase {
  async execute(id, data) {
    const workshop = await WorkshopRepository.findById(id);

    if (!workshop) {
      throw new NotFoundException(Message.WORKSHOP_NOT_FOUND);
    }

    const workshopUpdatead = await WorkshopRepository.update(id, data);

    return workshopUpdatead.toJson();
  }
}
