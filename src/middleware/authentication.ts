import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Obtener el token de la solicitud desde el encabezado Authorization
  const token = req.headers.authorization?.split(' ')[1];

  let errorMessage: string = ''
  
  if (!token) {
    errorMessage = 'Unthorized';
  } else {    
    try {
      const decodedToken = jwt.verify(token!, process.env.SECRET_KEY!) as {userId: number};
      const userId = decodedToken.userId
      req.userId = userId;
      next();
    } catch (error) {  
      res.status(401).json({
        status: 'FAILED',
        data: {
          error: 'Unauthorized'
        }
      });
    };
  }

  if (errorMessage) {
    res.status(401).json({
      status: 'FAILED',
      data: {
        error: 'Unauthorized'
      }
    });
  };
};