import { z } from 'zod';

export const userLoginValidationSchema = z.object({
  email: z.string(),
  password: z.string(),
});
