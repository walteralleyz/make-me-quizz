import { Repository, getRepository } from 'typeorm';

import { Consumer } from '../entity/consumer';
import { QuestionController } from './question';

export class ConsumerController {
    public consumerRepository: Repository<Consumer>;
    public request: any;
    public response: any;

    constructor(request: any, response: any) {
        this.consumerRepository = getRepository(Consumer);
        this.request = request;
        this.response = response;
    }

    async create() {
        const emailExists: Promise<Consumer | undefined> = this.consumerRepository.findOne({ 
            email: this.request.body.email 
        });

        const nickExist: Promise<Consumer | undefined> = this.consumerRepository.findOne({ 
            nick: this.request.body.nick 
        });

        const resultEmail: Consumer | undefined = await emailExists;
        const resultNick: Consumer | undefined = await nickExist;

        if(resultEmail) return this.response.status(400).json({ error: 'Email já cadastrado' });
        if(resultNick) return this.response.status(400).json({ error: 'Nick já cadastrado' });

        const body = this.consumerRepository.save(this.consumerRepository.create({ 
            nick: this.request.body.nick, 
            email: this.request.body.email, 
            phone: this.request.body.phone 
        }));

        const result = await body;

        return this.response.json({ result });
    }

    async nickExists() {
        const exists: Promise<Consumer | undefined> = this.consumerRepository.findOne({ 
            nick: this.request.params.nick 
        });

        const findOne: Consumer | undefined = await exists;

        if(findOne) return this.response.json({ error: 'Nick já está sendo usado' });

        return this.response.json({ message: 'Nick disponivel' });
    }

    async questionDone() {
        const question = new QuestionController(this.request, this.response);
        const done = await question.answer();

        if(done) {
            const exists: Promise<Consumer | undefined> = this.consumerRepository.findOne({ 
                id: this.request.params.id 
            });
    
            const findOne: Consumer | undefined = await exists;
    
            if(findOne) {
                findOne.points = findOne.points && findOne.points + 1;
                findOne.questionDoneId = findOne.questionDoneId && findOne.questionDoneId + 
                `, ${this.request.body.id}`;
    
                this.consumerRepository.save(findOne);
                
                return this.response.json({ message: 'Correto' });
            }
        }
    }
}