import { DeleteResult, getRepository, Repository } from "typeorm";

import { Categories } from "../entity/categories";
import { Question } from '../entity/question';

export async function getCategories(request: any, response: any): Promise<Categories[]> {
    const RepCat: Repository<Categories> = getRepository(Categories);
    const body: Promise<Categories[]> = RepCat.find({});

    const result: Categories[] = await body;

    return response.json({ result });
}

export async function getCategory(request: any, response: any): Promise<Question[]> {
    const Rep: Repository<Question> = getRepository(Question);
    const body: Promise<Question[]> = Rep.find({ categoria: request.params.category });

    const result: Question[] = await body;

    return response.json({ result });
}

export async function createQuestion(request: any, response:any): Promise<Question> {
    const { pergunta, escolhas, resposta } = request.body;
    const { category } = request.params;

    const Rep: Repository<Question> = getRepository(Question);
    const RepCat: Repository<Categories> = getRepository(Categories);

    await RepCat.save(RepCat.create({ categoria: category }));

    const body: Promise<Question> = Rep.save(Rep.create({
        pergunta,
        escolhas,
        categoria: category,
        resposta
    }));

    const result: Question = await body;

    return response.json({
        message: result
    }).status(200);
}

export async function deleteQuestion(request: any, response: any): Promise<DeleteResult> {
    const Rep: Repository<Question> = getRepository(Question);
    const body: Promise<DeleteResult> = Rep.delete(request.params.id);

    const result: DeleteResult = await body;

    return response.json({ result });
}

export async function isRightAnswer(request: any, response: any) {
    const Rep: Repository<Question> = getRepository(Question);
    const body: Promise<Question | undefined> = Rep.findOne({ id: request.body.id });

    const result: Question | undefined = await body;

    if(result) return result.resposta === request.body.answer;

    return false;
}