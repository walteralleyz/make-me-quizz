import { Router } from 'express';
import { Question } from '../entity/question';

import { getCategories, getCategory, createQuestion, deleteQuestion } from '../controller/question';

const questionRouter = Router();

questionRouter.get('/categories', async (req, res) => {
    const categories = await getCategories();

    return res.json({
        message: categories
    });
});

questionRouter.get('/categories/:category', async (req, res) => {
    const { category } = req.params;
    const questionsByCategory: Question[] = await getCategory(category);

    return res.json({
        message: questionsByCategory
    });
});

questionRouter.post('/categories/:category', async (req, res) => {
    const { pergunta, escolhas, consumerId, resposta } = req.body;
    const { category } = req.params;

    if(!consumerId || consumerId !== 1) return res.json({
        message: 'Falta nivel de administrador'
    }).status(403);

    if(!pergunta || !escolhas || !resposta) return res.json({
        message: "Campos estão faltando!"
    }).status(403);

    if(!escolhas.a
    || !escolhas.b
    || !escolhas.c
    || !escolhas.d
    || !escolhas.e) return res.json({
        message: "Numero inferior de escolhas permitido"
    }).status(403);

    const create: Question = await createQuestion(pergunta, escolhas, category, resposta, consumerId);

    return res.json({
        message: create
    }).status(200);
});

questionRouter.delete('/categories/:category/:id', (req, res) => {
    const { id } = req.params;

    deleteQuestion(parseInt(id));

    return res.json({
        message: 'Deletado'
    });
});

export default questionRouter;