import 'reflect-metadata';
import { error } from './helpers/log';
import { prelude } from './helpers/utils';
import Server from './Server';
import { NODE_ENV, PORT, HOST } from './helpers/params';

const main = async (): Promise<void> => {
    try {
        if (!NODE_ENV) prelude();

        const server = new Server(HOST, PORT);
        await server.run();
    } catch (err) {
        error(err.message);
        process.exit(-1);
    }
};

main();
