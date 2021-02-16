import dotenv from 'dotenv';
import { createConnection, Connection } from 'typeorm';

export default class Database {
    private static _instance: Database | null = null;
    private _connection: Connection | null = null;

    private constructor() {}

    public static getInstance(): Database {
        if (!Database._instance) {
            Database._instance = new Database();
        }

        return Database._instance;
    }

    public async authenticate(): Promise<Connection | never> {
        dotenv.config();

        if (!process.env.DATABASE_URL) throw new Error('Please check your DATABASE_URL value');

        const founded = (process.env.DATABASE_URL as string).match(
            /^(postgres):\/\/(.*):(.*)@(.*):(\d+)\/(.*)$/,
        );
        if (!founded) {
            throw new Error('Please check your DATABASE_URL value');
        }

        this._connection = await createConnection();
        return this._connection;
    }
}
