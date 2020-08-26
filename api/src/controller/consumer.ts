import { Repository, getRepository } from 'typeorm';

import { Consumer } from '../entity/consumer';
import { isRightAnswer } from './question';

export async function signup(request: any, response: any) {
    const { nick, email, phone } = request.body;

    const Rep: Repository<Consumer> = getRepository(Consumer);
    const emailExists: Promise<Consumer | undefined> = Rep.findOne({ email });
    const nickExist: Promise<Consumer | undefined> = Rep.findOne({ nick });

    const resultEmail: Consumer | undefined = await emailExists;
    const resultNick: Consumer | undefined = await nickExist;

    if(resultEmail) return response.status(400).json({ error: 'Email já cadastrado' });
    if(resultNick) return response.status(400).json({ error: 'Nick já cadastrado' });

    const body = Rep.save(Rep.create({ nick, email, phone }));

    const result = await body;

    return response.json({ result });
}

export async function nickExists(request: any, response: any) {
    const { nick } = request.params;

    const Rep: Repository<Consumer> = getRepository(Consumer);
    const exists: Promise<Consumer | undefined> = Rep.findOne({ nick });

    let findOne: Consumer | undefined = await exists;

    if(findOne) return response.json({ error: 'Nick já está sendo usado' });

    return response.json({ message: 'Nick disponivel' });
}

export async function setQuestionDone(request: any, response: any) {
    const done = await isRightAnswer(request, response);

    if(done) {
        const Rep: Repository<Consumer> = getRepository(Consumer);
        const exists: Promise<Consumer | undefined> = Rep.findOne({ id: request.params.id });

        let findOne: Consumer | undefined = await exists;

        if(findOne) {
            findOne.points = findOne.points && findOne.points + 1;
            findOne.questionDoneId = findOne.questionDoneId && findOne.questionDoneId + `, ${request.body.id}`;

            Rep.save(findOne);
            
            return response.json({ message: 'Correto' });
        }
    }

    return response.json({ error: 'Errado' });
}