import { Router } from 'express';

import { ConsumerController } from '../controller/consumer';
import { signin, signout } from '../controller/auth';
import { validation, checkValidation, loginValidation } from '../helpers/consumerValidator';
import { requireSignin } from '../controller/auth';

const userRouter = Router();
const consumerController: ConsumerController = new ConsumerController();

userRouter.post('/signin', loginValidation.check, loginValidation.handler, signin);
userRouter.post('/signup', validation.check, validation.handler, consumerController.create);
userRouter.post(
    '/check/:id/', 
    requireSignin, 
    checkValidation.check, 
    checkValidation.handler,
    consumerController.questionDone
);

userRouter.put('/update/:id', consumerController.update);

userRouter.get('/signout', signout);
userRouter.get('/nick/:nick', consumerController.nickExists);

export default userRouter;