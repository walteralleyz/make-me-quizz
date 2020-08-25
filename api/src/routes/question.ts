import { Router } from 'express';

import { requireSignin, isAdmin } from '../controller/auth';
import { createValidation } from '../helpers/questionValidator';
import { getCategories, getCategory, createQuestion, deleteQuestion } from '../controller/question';

const questionRouter = Router();

questionRouter.get('/categories', getCategories);
questionRouter.get('/categories/:category', requireSignin, getCategory);
questionRouter.post('/categories/:category', requireSignin, createValidation.check, createValidation.handler, isAdmin, createQuestion)
questionRouter.delete('/categories/:category/:id', requireSignin, isAdmin, deleteQuestion);

export default questionRouter;