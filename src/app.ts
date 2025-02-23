import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }));

// application route

const test = async (req: Request, res: Response) => {
  res.send('Hello');
};

app.get('/', test);

export default app;
