import express from 'express';
import cors from 'cors';
import exitHook from 'async-exit-hook';
import { env } from '~/config/environment';

import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb';
import { APIs_V1 } from '~/routes/v1';
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware';
import { corsOptions } from './config/cors';

const START_SERVER = () => {
    const app = express();

    // Xử lý CORS
    app.use(cors(corsOptions));

    app.use(express.json());

    app.use('/v1', APIs_V1);

    // Middlewara xử lý lỗi tập trung
    app.use(errorHandlingMiddleware);

    app.listen(env.APP_PORT, env.APP_HOST, () => {
        console.log(`3. Hello ${env.AUTHOR}, I am running at http://${env.APP_HOST}:${env.APP_PORT}/`);
    });

    exitHook(() => CLOSE_DB());
};

(async () => {
    try {
        console.log('1. Connecting to MongoDB Cloud Atlas...');
        await CONNECT_DB();
        console.log('2. Connected to MongoDB Cloud Atlas!');

        START_SERVER();
    } catch (error) {
        console.error(error);
        process.exit(0);
    }
})();
