import { z } from 'zod';

export const EditRecipeDto = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  ingredients: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string(),
        amount: z.string(),
        image: z.string().optional(),
      })
    )
    .optional(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
});
