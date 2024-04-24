import { z } from 'zod';

export const SignupDto = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  password_confirmation: z.string(),
});
