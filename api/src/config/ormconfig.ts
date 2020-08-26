import { ConnectionOptions } from 'typeorm';

export const config: ConnectionOptions = {
    type: "postgres",
    url: "postgres://cvbbqova:dFCThRFRcMUDBOvzwmHM0z7phpUQ6hKz@motty.db.elephantsql.com:5432/cvbbqova",
    entities: ["src/entity/*.ts"],
    synchronize: true
};