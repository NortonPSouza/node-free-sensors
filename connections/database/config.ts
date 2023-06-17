import { DataSourceOptions } from "typeorm";

export const config: DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "dev-norton",
    password: "admin",
    database: "freeSensors",
    synchronize: true,
    logging: false,
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migrations/**/*.ts'],
    // subscribers: [],
};