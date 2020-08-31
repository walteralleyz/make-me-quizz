import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import cors from 'cors';

import { Request, Response } from 'express';
import { createConnection, Connection } from 'typeorm';

import questionRouter from './routes/question';
import userRouter from './routes/consumer';
import docs from './docs.json';

const app = express();

dotenv.config();

const connection: Promise<Connection> = createConnection({
	type: 'postgres',
    url: process.env.TYPEORM_URL,
    entities: ['src/entity/*.ts'],
    synchronize: true
});

connection.then(dbRes => {
    console.log("DB connected!");
})
.catch(databaseError => console.error(databaseError));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/api/v1/docs', (request: Request, response: Response) => response.json(docs).status(200));
app.use('/api/v1/question', questionRouter);
app.use('/api/v1/user', userRouter);

app.use('*', (request: Request, response: Response) => {
    return response.status(404).json({ error: 'Rota não habilitada!' });
});

app.use((err: any, request: Request, response: Response, next: any) => {
	if(err.name === "UnauthorizedError") return response.status(401).json({
		message: "Acesso não autorizado!"
	});
});

app.listen(process.env.PORT || 5000, () => console.log('Server running!'));