import { z } from 'zod';
import fs from 'fs/promises';
import BaseController from '../../../../class_base/controller.base.js';
import { WorkshopRepository } from '../../Repositories/workshop.repository.js';
import { Message } from '../../../../common/messages.js';
import upload from '../../../../../multer.config.js';

/**
 * Controller class to handle workshop update requests.
 * @extends BaseController
 */
export default class UpdateWorkshopController extends BaseController {
  method = 'PATCH';
  path = '/:id';

  before = [upload.single('image')];

  async handle(req, res, next) {
    try {
      const idParser = z.string().uuid();
      const idResult = idParser.parse(req.params.id);

      if (!idResult) {
        throw new NotFoundException(Message.INVALID_ID);
      }

      const ingredientsArray = req.body.ingredients.toString().split(',');
      req.body.ingredients = ingredientsArray;

      const workshopData = await this.validateRequestWorkshop(req.body);
      const topicData = await this.validateRequestTopics(req.body.topics);
      let imagePath;

      if(req.file.path){
        const path = await WorkshopRepository.getImagePath(idResult)
        const imagePathOld =  path.rows[0]
        console.log(imagePathOld.image)
        this.deletePhoto('./' + imagePathOld.image)
        imagePath = req.file.path
      }


      await WorkshopRepository.update(idResult, workshopData, topicData, imagePath);

      super.send(res, { data: Message.UPDATE_EVENT_SUCCESS });

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

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

  isValidDate(value) {
    const date = new Date(value);
    const currentDate = new Date();

    if (date < currentDate) {
      throw new Error(Message.INVALID_DATE);
    }

    return !isNaN(date.getTime());
  }

  async deletePhoto(filePath) {
    try {
      // Verifica se o arquivo existe
      const exists = await fs.access(filePath);
      console.log(exists)

      // Exclui o arquivo
      const exist = await fs.unlink(filePath);

      console.log(`Foto ${filePath} excluída com sucesso.`);
    } catch (error) {
      console.error(`Erro ao excluir foto ${filePath}:`, error);
    }
  }
}
