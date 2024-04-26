import { z } from 'zod';

export const EditRecipeDto = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});
