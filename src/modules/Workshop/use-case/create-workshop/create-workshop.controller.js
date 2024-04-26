import { z } from 'zod';
import BaseController from '../../../../class_base/controller.base.js';
import { WorkshopRepository } from '../../Repositories/workshop.repository.js';
import { Message } from '../../../../common/messages.js';
import upload from '../../../../../multer.config.js';

/**
 * Controller class to handle workshop creation requests.
 * @extends BaseController
 */
export default class CreateWorkshopController extends BaseController {
  method = 'POST';
  path = '/';

  before = [upload.single('image')];

  async handle(req, res, next) {
    try {
      const ingredientsArray = req.body.ingredients.toString().split(',');
      req.body.ingredients = ingredientsArray;
      const imagePath = req.file.path;
      const workshopData = await this.validateRequestWorkshop(req.body);
      const topicData = await this.validateRequestTopics(req.body.topics);

      await WorkshopRepository.create(workshopData, topicData, imagePath);

      /* const data = {
        data_work: workshopData,
        data_topic: topicData,
      }; */

      super.send(res, { data: Message.CREATE_EVENT_SUCCESS });

      return true;
    } catch (error) {
      throw new Error(Message.FAIL_EVENT_SUCCESS);
    }
  }

  /**
   * Validates the request body according to the specified schema.
   * @param {Object} body - The request body.
   * @returns {Promise<Object>} The validated workshop data.
   * @throws {Error} If validation fails.
   */
  async validateRequestWorkshop(body) {
    const workshopSchema = z.object({
      title: z.string().min(3),
      description: z.string().min(1),
      category: z.string(),
      difficulty: z.string(),
      start_date: z.string().refine(this.isValidDate),
      creator_id: z.string().uuid(),
      creator_name: z.string().min(3),
      creator_experience: z.string(),
      ingredients: z.array(z.string()),
    });

    try {
      return workshopSchema.parse(body);
    } catch (error) {
      throw new Error(Message.INVALID_DATA);
    }
  }

  /**
   * Validates the topics provided in the request body according to the specified schema.
   * @param {string} topics - The topics provided in the request body.
   * @returns {Promise<Object[]>} The validated topics data.
   * @throws {Error} If validation fails.
   */
  async validateRequestTopics(topics) {
    const TopicSchema = z.object({
      topic_title: z.string().min(3),
      estimated_time: z.string(),
      topic_description: z.string().min(30),
      video_link: z.string().url(),
      completed: z.boolean(),
    });

    const newTopics = JSON.parse(topics);
    const validatedTopics = [];

    for (const topic of newTopics) {
      try {
        const validatedTopic = TopicSchema.parse(topic);
        validatedTopics.push(validatedTopic);
      } catch (error) {
        throw new Error(Message.INVALID_DATA);
      }
    }

    return validatedTopics;
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
