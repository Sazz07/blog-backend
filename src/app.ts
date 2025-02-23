import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }));

// application routes

const test = async (req: Request, res: Response) => {
  res.send('Hello');
};

app.get('/', test);

//global Error Handler
app.use(globalErrorHandler);

//not found routes
app.use(notFound);

export default app;
