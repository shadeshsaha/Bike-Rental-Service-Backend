import { z } from 'zod';

export const createRentalsValidationSchema = z.object({
  bikeId: z.string(),
  startTime: z.string().optional(),
});
