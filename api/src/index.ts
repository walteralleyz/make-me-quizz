import express from 'express';
import { createConnection, Connection } from 'typeorm';
import bodyParser from 'body-parser';

import { Perguntas } from './entity/perguntas';
import { Categorias } from './entity/categorias';
import { Consumer } from './entity/consumer';
import { Roles } from './entity/roles';

import questionRouter from './routes/perguntas';
import userRouter from './routes/user';

const app = express();
const address: string = 'localhost';
const port: number =  5000;

const connection: Promise<Connection> = createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "mmadmin",
    password: "@mmdb1937",
    database: "mmquizz",
    entities: [
        Perguntas,
        Categorias,
        Consumer,
        Roles
    ],
    synchronize: true
});

connection.then(res => {
    console.log("DB connected!");
})
.catch(databaseError => console.error(databaseError));

app.use(bodyParser.json());
app.use('api/v1/question', questionRouter);
app.use('api/v1/user', userRouter);

app.listen(port, address, () => console.log("Server running!"));