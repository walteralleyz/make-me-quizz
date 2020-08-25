import { Repository, getRepository } from 'typeorm';
import { createHmac } from 'crypto';

import { Consumer } from '../entity/consumer';
import { isRightAnswer } from './question';
import { hash } from '../helpers/config';

export async function createUser(request: any, response: any) {
    const { nick, email, phone } = request.body;

    const Rep: Repository<Consumer> = getRepository(Consumer);
    const exists: Promise<Consumer | undefined> = Rep.findOne({ email }) || Rep.findOne({ nick });

    let save: Consumer | undefined = await exists;

    if(save) return response.json({ error: 'Usuário já cadastrado' });

    const body = Rep.save(Rep.create({ nick, email, phone }));

    const result = await body;

    return response.json({ result });
}

export async function login(request: any, response: any) {
    const { email, phone } = request.body;

    const Rep: Repository<Consumer> = getRepository(Consumer);
    const exists: Promise<Consumer | undefined> = Rep.findOne({ email });
    const phoneHash: string = createHmac("sha1", hash).update(phone).digest("hex");

    let findOne: Consumer | undefined = await exists;

    if(findOne && findOne.phone === phoneHash) return response.json({ message: 'Logado' });

    return response.json({ error: 'Email ou Telefone inválido!' });
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