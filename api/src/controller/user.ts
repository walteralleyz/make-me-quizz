import { Repository, getRepository } from 'typeorm';
import { Consumer } from '../entity/consumer';
import { Roles } from '../entity/roles';

export async function createUser(request: any, response: any) {
    const { email, phone } = request.body;
    const id = 2;

    const Rep: Repository<Consumer> = getRepository(Consumer);
    const exists: Promise<Consumer | undefined> = Rep.findOne({ email });
    const rolesId: Roles = new Roles();

    rolesId.id = id;

    let save: Consumer | undefined = await exists;

    if(save) {
        return response.json({ error: 'Usuário já cadastrado' });
    }

    const body = Rep.save(Rep.create({
        email,
        phone
    }));

    const result = await body;

    return response.json({ result });
}

export async function login(request: any, response: any) {
    const { email, phone } = request.body;

    const Rep: Repository<Consumer> = getRepository(Consumer);
    const exists: Promise<Consumer | undefined> = Rep.findOne({ email });

    let findOne: Consumer | undefined = await exists;

    if(findOne && findOne.phone === phone) return response.json({ message: 'Logado' });

    return response.json({ error: 'Email ou Telefone inválido!' });
}