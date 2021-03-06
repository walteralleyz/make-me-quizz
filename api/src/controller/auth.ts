import { createHmac } from 'crypto';
import { sign as JWTSign } from 'jsonwebtoken';
import { Repository, getRepository } from 'typeorm';
import { Consumer } from '../entity/consumer';

import { hash, JWT_SECRET } from '../config/config';

const expressJwt = require('express-jwt');

export const requireSignin = expressJwt({
    secret: JWT_SECRET,
    userProperty: 'auth',
    algorithms: ['HS256']
});

export const isAdmin = (request: any, response: any, next: any) => {
    if(!request.auth || request.auth.id !== 1) return response.json({ error: 'Nivel administrador faltando' });

    next();
}

export async function signin(request: any, response: any) {
    const { email, phone } = request.body;

    const Rep: Repository<Consumer> = getRepository(Consumer);
    const exists: Promise<Consumer | undefined> = Rep.findOne({ email });
    const phoneHash: string = createHmac("sha1", hash).update(phone).digest("hex");

    const findOne: Consumer | undefined = await exists;
    const token: string = JWTSign({id: findOne && findOne.id}, JWT_SECRET);

    response.cookie("t", token, {expire: new Date('2030-01-01')});

    if(findOne && findOne.phone === phoneHash) return response.json({ 
        id: findOne.id,
        nick: findOne.nick,
        questionDone: findOne.questionDoneId,
        points: findOne.points,
        avatar: findOne.avatar,
        email: findOne.email,
        phone: '',
        token
    });

    return response.status(400).json({ error: 'Email ou Telefone inválido!' });
}

export function signout(request: any, response: any) {
    response.clearCookie("t");
    return response.json({ message: 'Saiu' });
}