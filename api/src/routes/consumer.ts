import { Router } from 'express';

import { createUser, login, nickExists, setQuestionDone } from '../controller/consumer';
import { validation, checkValidation, loginValidation } from '../helpers/consumerValidator';

const userRouter = Router();

userRouter.post('/signin', loginValidation.check, loginValidation.handler, login);
userRouter.post('/signup', validation.check, validation.handler, createUser);
userRouter.post('/check/:id/', checkValidation.check, checkValidation.handler, setQuestionDone);

userRouter.get('/nick/:nick', nickExists);

export default userRouter;