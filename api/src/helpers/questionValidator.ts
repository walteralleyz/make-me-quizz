import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const createValidation = {
    check: [
        body('pergunta').not().isEmpty().isString().isLength({ min: 5 }),
        body('escolhas').not().isEmpty(),
        body('escolhas.a').not().isEmpty().isString(),
        body('escolhas.b').not().isEmpty().isString(),
        body('escolhas.c').not().isEmpty().isString(),
        body('escolhas.d').not().isEmpty().isString(),
        body('escolhas.e').not().isEmpty().isString(),
        body('resposta').not().isEmpty().isString().isLength({ min: 1 })
    ],
    handler: (request: Request, response: Response, next: any) => {
        const errors = validationResult(request);

        if(!errors.isEmpty()) {
            const error = errors.array()[0];

            return response.json({ error }).status(400);
        }

        next();
    }
};