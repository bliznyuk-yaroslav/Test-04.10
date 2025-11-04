import createHttpError from 'http-errors';
import { Request, Response, NextFunction } from 'express';

const isValid = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const num = Number(id);
  if (!Number.isInteger(num) || num <= 0) {
    return next(createHttpError(400, 'Invalid id parameter'));
  }
  next();
};

export default isValid;