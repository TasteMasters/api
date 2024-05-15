import { z } from 'zod';
import BaseController from '../../../../class_base/controller.base.js';
import { WorkshopRepository } from '../../Repositories/workshop.repository.js';
import { Message } from '../../../../common/messages.js';
import { CreateWorkshopDto } from './create-workshop.dto.js';

/**
 * Controller class to handle workshop creation requests.
 * @extends BaseController
 */
export default class CreateWorkshopController extends BaseController {
  method = 'POST';
  path = '/';

  async handle(req, res, next) {
    try {
      const ingredientsArray = req.body.ingredients.toString().split(',');
      req.body.ingredients = ingredientsArray;
      const workshopData = CreateWorkshopDto.parse(req.body);

      workshopData.creator_id = req.authUser.id;

      await WorkshopRepository.create(workshopData);

      super.send(res, { data: Message.CREATE_EVENT_SUCCESS });

      return true;
    } catch (error) {
      next(error);
    }
  }

  /**
   * Validates if the provided value is a valid date and is not in the past.
   * @param {string} value - The date value to validate.
   * @returns {boolean} True if the date is valid and not in the past, false otherwise.
   * @throws {Error} If the date is in the past.
   */
  isValidDate(value) {
    const date = new Date(value);
    const currentDate = new Date();

    if (date < currentDate) {
      throw new Error(Message.INVALID_DATE);
    }

    return !isNaN(date.getTime());
  }
}
