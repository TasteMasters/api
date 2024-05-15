import { z } from 'zod';

export const CreateWorkshopDto = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  difficulty: z.string(),
  start_date: z.string(),
  ingredients: z.array(z.string()),
  image: z.string(z.string()),
  topics: z.array(
    z.object({
      title: z.string(),
      estimated_time: z.string(),
      description: z.string(),
      video_link: z.string().url(),
      completed: z.boolean(),
    })
  ),
});
