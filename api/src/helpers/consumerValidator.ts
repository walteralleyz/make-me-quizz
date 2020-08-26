import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validation = {
    check: [
        body('nick').not().isEmpty().isLength({ min: 4 }),
        body('email').not().isEmpty().isEmail(),
        body('phone').not().isEmpty().isString().isLength({ min: 12, max: 13})
    ],

    handler: (request: Request, response: Response, next: any) => {
        const errors = validationResult(request);

        if(!errors.isEmpty()) {
            const error = errors.array()[0];

            return response.status(400).json({ error });
        }

        next();
    }
};

export const loginValidation = {
    check: [
        body('email').not().isEmpty().isEmail(),
        body('phone').not().isEmpty().isString().isLength({ min: 12, max: 13})
    ],

    handler: (request: Request, response: Response, next: any) => {
        const errors = validationResult(request);

        if(!errors.isEmpty()) {
            const error = errors.array()[0];

            return response.status(400).json({ error });
        }

        next();
    }
};

export const checkValidation = {
    check: [
        body('id').not().isEmpty().isNumeric(),
        body('answer').not().isEmpty().isString().isLength({ max: 1 })
    ],

    handler: (request: Request, response: Response, next: any) => {
        const errors = validationResult(request);

        if(!errors.isEmpty()) {
            const error = errors.array()[0];

            return response.status(400).json({ error });
        }

        next();
    }
}