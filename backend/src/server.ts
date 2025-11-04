import express from 'express';
import cors from 'cors';
import { PORT } from './constant/index';
import rootRouter from './routers';
import notFoundHandler from './middlewares/notFoundHandler';
import errorHandler from './middlewares/errorHandler';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/', rootRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
};

