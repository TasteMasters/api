import { z } from 'zod';

export const UpdateUserDto = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  experience: z.string().optional(),
  specialization: z.string().optional(),
  photo: z.string().optional(),
});
