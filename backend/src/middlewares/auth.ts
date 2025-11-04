import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constant/index';

export interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
