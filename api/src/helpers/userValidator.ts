import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validation = {
    check: [
        body('email').not().isEmpty().isEmail(),
        body('phone').not().isEmpty().isString().isLength({ min: 12, max: 13})
    ],

    handler: (request: Request, response: Response, next: any) => {
        const errors = validationResult(request);

        if(!errors.isEmpty()) {
            const result = errors.array()[0];

            return response.json({ error: result }).status(400);
        }

        next();
    }
};