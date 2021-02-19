import express, { Express } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import routes from './routes';
import Database from './db';
import { error, info, success } from './helpers/log';

import './middlewares/passport';
export default class Server {
    private _host: string;
    private _port: number;
    private _app: Express | null = null;

    public constructor(host: string, port: number) {
        this._host = host;
        this._port = port;
    }

    private async _initialize(): Promise<void> {
        const db = Database.getInstance();

        try {
            await db.authenticate();
        } catch (err) {
            error(err.message);
            process.exit(-1);
        }

        success('Database successfully authenticated');
        this._app = express();
        this._app.use(cors());
        this._app.use(helmet());
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
        this._app.use(passport.initialize());
        this._app.use('/', routes);
    }

    public async run(): Promise<void> {
        await this._initialize();

        if (this._app)
            this._app.listen(this._port, () => {
                info(`Server is listening on ${this._host}:${this._port}`);
            });
    }
}
