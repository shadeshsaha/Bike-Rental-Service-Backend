/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { globalError } from './app/middleware/globalError';
import { notfoundError } from './app/middleware/notFoundError';
import router from './app/router';
const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('This Is Bike Rental Services Backend');
});

// global error
app.use(globalError);

// notfound route handler
app.use(notfoundError);

export default app;
