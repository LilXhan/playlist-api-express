import { Router } from 'express';
import { createUser, getAllUser, loginUser } from '../controllers/user.controller';

const userRouter: Router = Router();

userRouter.get('', getAllUser);
userRouter.post('', createUser);
userRouter.post('/login', loginUser);

export default userRouter;