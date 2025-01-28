import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/userModel';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
     res.status(401).json({ message: 'Access denied, token missing' });
     return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as IUser;
    req.user = decoded; // This should work now without errors
    next();
  } catch (error) {
     res.status(400).json({ message: 'Invalid token' });
     return;
  }
};
