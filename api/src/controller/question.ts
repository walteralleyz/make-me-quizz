import { DeleteResult, getRepository, Repository } from "typeorm";

import { Categories } from "../entity/categories";
import { Question } from '../entity/question';

export class QuestionController {
    questionRepository: Repository<Question>;
    categoriesRepository: Repository<Categories>;
    request: any;
    response: any;

    constructor(request: any, response: any) {
        this.questionRepository = getRepository(Question);
        this.categoriesRepository = getRepository(Categories);
        this.request = request;
        this.response = response;
    }

    async create() {
        await this.categoriesRepository.save(this.categoriesRepository.create({ 
            categoria: this.request.params.category 
        }));

        const body: Promise<Question> = this.questionRepository.save(this.questionRepository.create({
            pergunta: this.request.body.pergunta,
            escolhas: this.request.body.escolhas,
            categoria: this.request.params.category,
            resposta: this.request.body.resposta
        }));

        const result: Question = await body;

        return this.response.json({
            message: result
        }).status(200);
    }

    async getAll() {
        const body: Promise<Question[]> = this.questionRepository.find({ categoria: this.request.params.category });
        const result: Question[] = await body;

        return this.response.json({ result });
    }

    async delete() {
        const body: Promise<DeleteResult> = this.questionRepository.delete(this.request.params.id);
        const result: DeleteResult = await body;

        return this.response.json({ result });
    }

    async getCategories() {
        const body: Promise<Categories[]> = this.categoriesRepository.find({});
        const result: Categories[] = await body;

        return this.response.json({ result });
    }

    async answer() {
        const body: Promise<Question | undefined> = this.questionRepository.findOne({ id: this.request.body.id });
        const result: Question | undefined = await body;

        if(result) return result.resposta === this.request.body.answer;

        return false;
    }
}