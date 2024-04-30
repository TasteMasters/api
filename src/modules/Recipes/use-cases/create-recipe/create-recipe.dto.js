import { z } from 'zod';

export const CreateRecipesDto = z.object({
  title: z.string(),
  description: z.string(),
  ingredients: z
    .array(
      z.object({
        name: z.string(),
        amount: z.string(),
        image: z.string().optional(),
      })
    )
    .optional(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
});
