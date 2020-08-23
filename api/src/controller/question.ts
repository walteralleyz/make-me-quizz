import { DeleteResult, getRepository, Repository } from "typeorm";

import { Categories } from "../entity/categories";
import { Question } from '../entity/question';
import { Consumer } from '../entity/consumer';


export async function getCategories(): Promise<Categories[]> {
    const RepCat: Repository<Categories> = getRepository(Categories);
    const body: Promise<Categories[]> = RepCat.find({});

    const result: Categories[] = await body;

    return result;
}

export async function getCategory(category: string): Promise<Question[]> {
    const Rep: Repository<Question> = getRepository(Question);
    const body: Promise<Question[]> = Rep.find({ categoria: category });

    const result: Question[] = await body;

    return result;
}

export async function createQuestion(question: string, escolhas: object, categoria: string, resposta: string, consumerId: number): Promise<Question> {
    const Rep: Repository<Question> = getRepository(Question);
    const RepCat: Repository<Categories> = getRepository(Categories);
    const consumer = new Consumer();

    consumer.id = consumerId;

    await RepCat.save(RepCat.create({ categoria }));

    const body: Promise<Question> = Rep.save(Rep.create({
        pergunta: question,
        escolhas,
        categoria,
        resposta,
        consumer: [consumer]
    }));

    const result: Question = await body;

    return result;
}

export async function deleteQuestion(id: number): Promise<DeleteResult> {
    const Rep: Repository<Question> = getRepository(Question);
    const body: Promise<DeleteResult> = Rep.delete(id);

    const result: DeleteResult = await body;

    return result;
}