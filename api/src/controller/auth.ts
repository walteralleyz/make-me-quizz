import { createHmac } from 'crypto';
import { sign as JWTSign, decode } from 'jsonwebtoken';
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
    const { Authorization } = request.header;
    const decoded: any = decode(Authorization);

    if(decoded && decoded.id) {
        if(decoded.id !== 1) next();
    } else {
        return response.json({ error: 'Nivel administrador faltando!' });
    }
}

export async function signin(request: any, response: any) {
    const { email, phone } = request.body;

    const Rep: Repository<Consumer> = getRepository(Consumer);
    const exists: Promise<Consumer | undefined> = Rep.findOne({ email });
    const phoneHash: string = createHmac("sha1", hash).update(phone).digest("hex");

    const findOne: Consumer | undefined = await exists;
    const token: string = JWTSign({id: findOne && findOne.id}, JWT_SECRET);

    if(findOne && findOne.phone === phoneHash) return response.json({ message: 'Logado', token });

    response.cookie("t", token, {expire: new Date('2030-01-01')});

    return response.json({ error: 'Email ou Telefone inválido!' });
}

export function signout(request: any, response: any) {
    response.clearCookie("t");
    return response.json({ message: 'Saiu' });
}