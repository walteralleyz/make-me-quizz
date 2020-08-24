import { Router } from 'express';

import { createValidation } from '../helpers/questionValidator';
import { getCategories, getCategory, createQuestion, deleteQuestion } from '../controller/question';

const questionRouter = Router();

questionRouter.get('/categories', getCategories);
questionRouter.get('/categories/:category', getCategory);
questionRouter.post('/categories/:category', createValidation.check, createValidation.handler, createQuestion)
questionRouter.delete('/categories/:category/:id', deleteQuestion);

export default questionRouter;