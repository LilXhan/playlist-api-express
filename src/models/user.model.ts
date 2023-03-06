import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface User {
  id: number,
  name: string,
  email: string,
  password: string,
  last_session: Date,
  date_born: Date | null,
  updated_at: Date
}

export async function createUserHashed(name: string, email: string, password: string, date_born: Date): Promise<User> {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      date_born
    }
  });
  return user;
}