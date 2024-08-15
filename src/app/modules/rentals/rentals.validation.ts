import { z } from 'zod';

export const createRentalsValidationSchema = z.object({
  body: z.object({
    bikeId: z.string({ required_error: 'Bike id is required' }),
    startTime: z.string().datetime(),
  }),
  // bikeId: z.string(),
  // startTime: z.string().optional(),
});
