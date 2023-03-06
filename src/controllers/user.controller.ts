import { Request, Response } from 'express';
import { createUserHashed } from '../models/user.model';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let errorMessage: string = '';

  // buscar el usuario en la base de datos
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  // si no encuentra al usuario, se establece el mensaje de error
  if (!user) {
    errorMessage = 'Email or password incorrect';
  } else {
    // compara la password ingresada con la password encriptada en la base de datos
    const isMatch = await bcrypt.compare(password, user!.password);

    // Si las passwords no coinciden, se establece el mensaje de error 
    if (!isMatch) {
      errorMessage = 'Email or password incorrect';
    }
  }

  // si hay un mensaje de error, se envía una respuesta JSON con el mensaje de error
  if (errorMessage) {
    res.status(400).json({
      status: 'FAILED',
      data: {
        error: errorMessage
      }
    });
  } else {
    // crear un token con jsonwebtoken 
    const token =  jwt.sign({userId: user!.id}, process.env.SECRET_KEY!);
    res.status(200).json({
      status: 'OK',
      data: {
        token: token
      }
    });
  }
}


export const getAllUser = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      include: {playlists: true}
    });
    res.status(200).json({
      status: 'OK',
      data: users
    });
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      data: {
        error: error
      }
    });
  };
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {name, email, password, date_born} = req.body;
    const newUser = await createUserHashed(name, email, password, date_born);
    const {email: email_user, password: password_user} = newUser;
    const token = jwt.sign({email: email_user, password: password_user},
      process.env.SECRET_KEY!, {
        expiresIn: '18000s',
      });
    res.status(201).json({
      status: 'OK',
      data: {
        data: newUser,
        token: token
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      data: {
        error: error
      }
    });
  };
};