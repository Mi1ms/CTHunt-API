import 'reflect-metadata';
import dotenv from 'dotenv';
import { error } from './helpers/log';
import { prelude } from './helpers/utils';
import Server from './Server';

const main = async () => {
    try {
        dotenv.config();
        if(!process.env.NODE_ENV)
            prelude();
       
            

        const port = parseInt(process.env.PORT || '4242', 10);
        const host = process.env.HOST || '0.0.0.0';

        const server = new Server(host, port);
        await server.run();
    } catch (err) {
        error(err.message);
        process.exit(-1);
    }
};

main();
