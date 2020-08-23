import express from 'express';
import { createConnection, Connection } from 'typeorm';
import bodyParser from 'body-parser';

import { config } from './helpers/ormconfig';

import questionRouter from './routes/question';
import userRouter from './routes/user';

const app = express();
const address: string = 'localhost';
const port: number =  5000;

const connection: Promise<Connection> = createConnection(config);

connection.then(res => {
    console.log("DB connected!");
})
.catch(databaseError => console.error(databaseError));

app.use(bodyParser.json());
app.use('/api/v1/question', questionRouter);
app.use('/api/v1/user', userRouter);

app.listen(port, address, () => console.log("Server running!"));