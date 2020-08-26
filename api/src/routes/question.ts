import { Router } from 'express';

import { requireSignin, isAdmin } from '../controller/auth';
import { createValidation } from '../helpers/questionValidator';
import { QuestionController } from '../controller/question';

const questionRouter = Router();
const questionController: QuestionController = new QuestionController();

questionRouter.get('/categories', questionController.getCategories);
questionRouter.get('/categories/:category', requireSignin, questionController.getAll);

questionRouter.post(
    '/categories/:category', 
    requireSignin, 
    createValidation.check, 
    createValidation.handler,
    isAdmin,
    questionController.create
);

questionRouter.delete('/categories/:category/:id', requireSignin, isAdmin, questionController.delete);

export default questionRouter;