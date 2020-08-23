import { Router } from 'express';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import { Perguntas } from '../entity/perguntas';
import { Categorias } from '../entity/categorias';
import { Consumer } from '../entity/consumer';

const questionRouter = Router();

questionRouter.get('/categories', (req, res) => {
    const RepCat: Repository<Categorias> = getRepository(Categorias);
    const results: Promise<Categorias[]> = RepCat.find({});

    results.then(dbRes => {
        return res.json({
            message: dbRes
        });
    }).catch(dbErr => {
        return res.json({
            message: dbErr
        }).status(403);
    })
});

questionRouter.get('/categories/:category', (req, res) => {
    const Rep: Repository<Perguntas> = getRepository(Perguntas);
    const { category } = req.params;

    const results: Promise<Perguntas[]> =  Rep.find({ categoria: category });

    results.then(dbRes => {
        return res.json({
            message: dbRes
        });
    }).catch(dbErr => {
        return res.json({
            message: "Erro"
        }).status(403);
    })
});

questionRouter.post('/categories/:category', (req, res) => {
    const { pergunta, escolhas, consumerId, resposta } = req.body;
    const { category } = req.params;

    if(!consumerId || consumerId !== 1) return res.json({
        message: 'Falta nivel de administrador'
    }).status(403);

    if(!pergunta || !escolhas || !resposta) return res.json({
        message: "Campos estão faltando!"
    }).status(403);

    if(!escolhas.a
    || !escolhas.b
    || !escolhas.c
    || !escolhas.d
    || !escolhas.e) return res.json({
        message: "Numero inferior de escolhas permitido"
    }).status(403);

    const Rep: Repository<Perguntas> = getRepository(Perguntas);
    const RepCat: Repository<Categorias> = getRepository(Categorias);

    const consumer = new Consumer();

    consumer.id = consumerId;

    Rep.save(Rep.create({
        pergunta,
        escolhas,
        categoria: category,
        resposta,
        consumer: [consumer]
    }));

    RepCat.save(Rep.create({
        categoria: category
    })).then(dbRes => dbRes).catch(dbErr => console.log("Categoria já existe!"));

    return res.json({
        message: 'Tudo certo'
    }).status(200);
});

questionRouter.delete('/categories/:category/:id', (req, res) => {
    const Rep: Repository<Perguntas> = getRepository(Perguntas);
    const { id } = req.params;

    const body: Promise<DeleteResult> = Rep.delete(id);
    const response = body.then(dbRes => dbRes).catch(dbErr => dbErr);

    console.log(response);

    return res.json({
        message: 'Deletado'
    });
});

export default questionRouter;