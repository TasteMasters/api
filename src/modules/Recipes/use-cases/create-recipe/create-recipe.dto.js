import { z } from 'zod';

export const CreateRecipesDto = z.object({
  title: z.string(),
  description: z.string(),
});
