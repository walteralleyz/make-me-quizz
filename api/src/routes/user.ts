import { Router } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Consumer } from '../entity/consumer';
import { Roles } from '../entity/roles';

const userRouter = Router();

userRouter.post('/signin', (req, res) => {
    const { email, phone } = req.body;
    
    if(!email || !phone) return res.json({
        message: 'Faltam dados para o cadastro'
    }).status(403);

    const Rep: Repository<Consumer> = getRepository(Consumer);
    const exists: Promise<Consumer | undefined> = Rep.findOne({ email });

    exists.then(dbRes => {
        if(dbRes) {
            if(dbRes.phone === phone) return res.json({
                message: 'Logado'
            });
        }

        return res.json({
            message: 'Usuário não Cadastrado!'
        }).status(403);
    })
});

userRouter.post('/signup', (req, res) => {
    const { email, phone } = req.body;

    if(!email || !phone) return res.json({
        message: 'Faltam dados para o cadastro'
    }).status(403);

    const Rep: Repository<Consumer> = getRepository(Consumer);
    const exists: Promise<Consumer[] | undefined> = Rep.find({ email });
    const rolesId: Roles = new Roles();

    rolesId.id = 2;

    exists.then(dbRes => {
        if(dbRes && dbRes.length === 0) {
            Rep.save(Rep.create({
                email,
                phone,
                roles: rolesId
            }));

            return res.json({
                message: 'Cadastrado!'
            });
        }

        return res.json({
            message: 'Usuário já cadastrado'
        }).status(403);
    })
});

export default userRouter;