import { z } from 'zod';

export const UpdateUserDto = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  experience: z.string().optional(),
  specialization: z.string().optional(),
  pinterest: z.string().optional(),
  linkedin: z.string().optional(),
  instagram: z.string().optional(),
  photo: z.string().optional(),
});
