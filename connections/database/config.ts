import { DataSourceOptions } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

export const config: DataSourceOptions = {
    type: "mysql",
    host: String(process.env.DATABASE_HOST),
    port: Number(process.env.DATABASE_PORT),
    username: String(process.env.DATABASE_USERNAME),
    password: String(process.env.DATABASE_PASSWORD),
    database: String(process.env.DATABASE),
    synchronize: true,
    logging: false,
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migrations/**/*.ts'],
    // subscribers: [],
};