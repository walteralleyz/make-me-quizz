import { Request, Response } from "express";
import { DeleteResult, getRepository, Repository } from "typeorm";

import { Categories } from "../entity/categories";
import { Question } from '../entity/question';

export class QuestionController {
    async create(request: Request, response: Response) {
        const questionRepository: Repository<Question> = getRepository(Question);
        const categoriesRepository: Repository<Categories> = getRepository(Categories);

        await categoriesRepository.save(categoriesRepository.create({ 
            categoria: request.params.category 
        })).then(dbRes => dbRes).catch(dbErr => console.log('Categoria'));

        const body: Promise<Question> = questionRepository.save(questionRepository.create({
            pergunta: request.body.pergunta,
            escolhas: request.body.escolhas,
            categoria: request.params.category.toLowerCase(),
            resposta: request.body.resposta
        }));

        const result: Question = await body;

        return response.json({
            message: result
        }).status(200);
    }

    async getAll(request: Request, response: Response) {
        const questionRepository: Repository<Question> = getRepository(Question);

        const body: Promise<Question[]> = questionRepository.find({ categoria: request.params.category });
        const result: Question[] = await body;

        return response.json({ result });
    }

    async delete(request: Request, response: Response) {
        const questionRepository: Repository<Question> = getRepository(Question);

        const body: Promise<DeleteResult> = questionRepository.delete(request.params.id);
        const result: DeleteResult = await body;

        return response.json({ result });
    }

    async getCategories(request: Request, response: Response) {
        const categoriesRepository: Repository<Categories> = getRepository(Categories);

        const body: Promise<Categories[]> = categoriesRepository.find({});
        const result: Categories[] = await body;

        return response.json({ result });
    }

    async answer(request: Request, response: Response) {
        const questionRepository: Repository<Question> = getRepository(Question);

        const body: Promise<Question | undefined> = questionRepository.findOne({ id: request.body.id });
        const result: Question | undefined = await body;

        if(result) return result.resposta === request.body.answer;

        return false;
    }
}