import { Router } from 'express';

import { ConsumerController } from '../controller/consumer';
import { signin, signout } from '../controller/auth';
import { validation, checkValidation, loginValidation } from '../helpers/consumerValidator';
import { requireSignin } from '../controller/auth';

const userRouter = Router();

userRouter.post('/signin', loginValidation.check, loginValidation.handler, signin);
userRouter.get('/signout', signout);

userRouter.post('/signup', validation.check, validation.handler, (req: any, res: any) => {
    const consumer: ConsumerController = new ConsumerController(req, res);
    consumer.create();
});

userRouter.post(
    '/check/:id/', 
    requireSignin, 
    checkValidation.check, 
    checkValidation.handler,
    (req: any, res: any) => {
        const consumer: ConsumerController = new ConsumerController(req, res);
        consumer.questionDone();
    } 
);

userRouter.get('/nick/:nick', (req: any, res: any) => {
    const consumer: ConsumerController = new ConsumerController(req, res);
    consumer.nickExists();
});

export default userRouter;