import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

import { Request, Response } from 'express';
import { createConnection, Connection } from 'typeorm';

import questionRouter from './routes/question';
import userRouter from './routes/consumer';
import docs from './docs.json';

const app = express();
const address: string = 'localhost';
const port: number =  5000;

dotenv.config();

const connection: Promise<Connection> = createConnection({
	type: 'postgres',
    url: process.env.TYPEORM_URL,
    entities: ['build/entity/*.js'],
    synchronize: true
});

connection.then(dbRes => {
    console.log("DB connected!");
})
.catch(databaseError => console.error(databaseError));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/api/v1/docs', (request: Request, response: Response) => response.json(docs).status(200));
app.use('/api/v1/question', questionRouter);
app.use('/api/v1/user', userRouter);

app.use('*', (request: Request, response: Response) => {
    return response.json({ error: 'Rota não habilitada!' }).status(404);
});

app.use((err: any, request: Request, response: Response, next: any) => {
	if(err.name === "UnauthorizedError") return response.status(401).json({
		message: "Acesso não autorizado!"
	});
});

app.listen(port, address, () => console.log('Server running on port %s', port));