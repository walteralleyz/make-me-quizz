import { ConnectionOptions } from 'typeorm';

export const config: ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "mmadmin",
    password: "@mmdb1937",
    database: "mmquizz",
    entities: ["src/entity/*.ts"],
    synchronize: true
};