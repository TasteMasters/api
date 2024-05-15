import { z } from 'zod';

export const ChangePasswordDto = z.object({
  old_password: z.string(),
  new_password: z.string(),
  confirm_password: z.string(),
});
