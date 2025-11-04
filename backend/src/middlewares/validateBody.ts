import createHttpError from 'http-errors';
import { Request, Response, NextFunction } from 'express';

export const validateBody = (schema: { validateAsync: (data: unknown, options?: any) => Promise<any> }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if ((req as any).file) {
        return next();
      }

      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (err: any) {
      const error = createHttpError(400, 'Bad Request', {
        errors: err?.details,
      });
      next(error);
    }
  };