import { Router } from 'express';

import { requireSignin, isAdmin } from '../controller/auth';
import { createValidation } from '../helpers/questionValidator';
import { QuestionController } from '../controller/question';

const questionRouter = Router();

questionRouter.get('/categories', (req, res) => {
    const question = new QuestionController(req, res);
    question.getCategories();
});

questionRouter.get('/categories/:category', requireSignin, (req, res) => {
    const question = new QuestionController(req, res);
    question.getAll();
});

questionRouter.post(
    '/categories/:category', 
    requireSignin, 
    createValidation.check, 
    createValidation.handler, 
    isAdmin,
    (req: any, res: any) => {
        const question = new QuestionController(req, res);
        question.create();
    }
);

questionRouter.delete('/categories/:category/:id', requireSignin, isAdmin, (req, res) => {
    const question = new QuestionController(req, res);
    question.delete();
});

export default questionRouter;