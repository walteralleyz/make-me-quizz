import { Router } from 'express';

import { createUser, login } from '../controller/user';
import { validation } from '../helpers/userValidator';

const userRouter = Router();

userRouter.post('/signin', validation.check, validation.handler, login);
userRouter.post('/signup', validation.check, validation.handler, createUser);

export default userRouter;