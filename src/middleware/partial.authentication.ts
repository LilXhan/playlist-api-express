import { Response, Request, NextFunction } from "express"
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    req.isAuthenticated = false;
    next();
    return;
  }

  try {
    const decodedToken = jwt.verify(token!, process.env.SECRET_KEY!) as {userId: number}
    const userId = decodedToken.userId;
    req.userId = userId;
    req.isAuthenticated = true;
    next();
  } catch(error) {
    req.isAuthenticated = false;
    next();
  }
}