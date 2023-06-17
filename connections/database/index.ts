import "reflect-metadata";
import { DataSource } from 'typeorm';
//
import { config } from './config';
export default class Database {

    public connection: DataSource

    constructor() {
        this.connection = new DataSource(config);
    }

    public async initConnection(): Promise<boolean>	{
        try {
            await this.connection.initialize();
            return true;
        } catch (err) {
            console.error("⚡️[database]: error during data Source initialization", err);
            throw new Error(err);
        }
    }
}