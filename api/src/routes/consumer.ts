import { Router } from 'express';

import { nickExists, setQuestionDone, signup } from '../controller/consumer';
import { signin, signout } from '../controller/auth';
import { validation, checkValidation, loginValidation } from '../helpers/consumerValidator';
import { requireSignin } from '../controller/auth';

const userRouter = Router();

userRouter.post('/signin', loginValidation.check, loginValidation.handler, signin);
userRouter.post('/signup', validation.check, validation.handler, signup);
userRouter.get('/signout', signout);
userRouter.post('/check/:id/', requireSignin, checkValidation.check, checkValidation.handler, setQuestionDone);

userRouter.get('/nick/:nick', nickExists);

export default userRouter;