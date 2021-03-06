import { createConnection, Connection } from 'typeorm';
import { DATABASE_URL } from '../helpers/params';

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
        if (!DATABASE_URL) throw new Error('Please check your DATABASE_URL value');

        const founded = (DATABASE_URL as string).match(
            /^(postgres):\/\/(.*):(.*)@(.*):(\d+)\/(.*)$/,
        );
        if (!founded) {
            throw new Error('Please check your DATABASE_URL value');
        }

        // console.table(founded[]);
        const [, type, username, password, host, port, database] = founded;
        this._connection = await createConnection({
            type: type as any,
            host,
            port: parseInt(port, 10),
            username,
            password,
            database,
            synchronize: true,
            logging: false,
            ssl: { rejectUnauthorized: false },
        });
        return this._connection;
    }
}
