import { Repository, getRepository } from 'typeorm';

import { Consumer } from '../entity/consumer';
import { QuestionController } from './question';

export class ConsumerController {
    async create(request: any, response: any) {
        const consumerRepository: Repository<Consumer> = getRepository(Consumer);

        const emailExists: Promise<Consumer | undefined> = consumerRepository.findOne({ 
            email: request.body.email 
        });

        const nickExist: Promise<Consumer | undefined> = consumerRepository.findOne({ 
            nick: request.body.nick 
        });

        const resultEmail: Consumer | undefined = await emailExists;
        const resultNick: Consumer | undefined = await nickExist;

        if(resultEmail) return response.status(400).json({ error: 'Email já cadastrado' });
        if(resultNick) return response.status(400).json({ error: 'Nick já cadastrado' });

        const body = consumerRepository.save(consumerRepository.create({ 
            nick: request.body.nick, 
            email: request.body.email, 
            phone: request.body.phone,
            avatar: request.body.avatar
        }));

        const result = await body;

        return response.json({ result });
    }

    async update(request: any, response: any) {
        const consumerRepository: Repository<Consumer> = getRepository(Consumer);
        const user: Promise<Consumer | undefined> = consumerRepository.findOne({
            id: request.params.id
        });

        const resultUser = await user;

        if(resultUser) {
            resultUser.nick = request.body.nick;
            resultUser.email = request.body.email;
            resultUser.avatar = request.body.avatar;

            const result = await consumerRepository.save(resultUser);

            return response.json({ result });
        }

        return response.status(400).json({ error: "Não encontrado" });
    }

    async nickExists(request: any, response: any) {
        const consumerRepository: Repository<Consumer> = getRepository(Consumer);

        const exists: Promise<Consumer | undefined> = consumerRepository.findOne({ 
            nick: request.params.nick 
        });

        const findOne: Consumer | undefined = await exists;

        if(findOne) return response.json({ error: 'Nick já está sendo usado' });

        return response.json({ message: 'Nick disponivel' });
    }

    async questionDone(request: any, response: any) {
        const consumerRepository: Repository<Consumer> = getRepository(Consumer);

        const question = new QuestionController();
        const done = await question.answer(request, response);

        if(done) {
            const exists: Promise<Consumer | undefined> = consumerRepository.findOne({ 
                id: request.params.id 
            });
    
            const findOne: Consumer | undefined = await exists;
    
            if(findOne && findOne.points !== undefined) {
                findOne.points += 1;
                findOne.questionDoneId = findOne.questionDoneId && findOne.questionDoneId + 
                `,${request.body.id}`;
    
                consumerRepository.save(findOne);
                
                return response.json({ message: 'Correto' });
            }
        }

        return response.status(400).json({ error: 'Errado' });
    }
}