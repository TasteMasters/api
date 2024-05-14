import { z } from 'zod';

export const UpdateWorkshopDto = z.object({
  id: z.string().uuid().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  difficulty: z.string().optional(),
  start_date: z.string().optional(),
  ingredients: z.array(z.string()).optional(),
  image: z.string(z.string()).optional(),
  topics: z
    .array(
      z.object({
        title: z.string(),
        estimated_time: z.string(),
        description: z.string(),
        video_link: z.string().url(),
        completed: z.boolean(),
      })
    )
    .optional(),
});
