import * as express from 'express';
import { Express } from 'express';
import * as path from 'path';
import * as livereload from 'livereload';
import * as connectLivereload from 'connect-livereload';
import { mongo } from './mongo';
import { routerIndex } from './routes';

export default function createApp(): Express {
    const app = express();
    let livereloadServer: any;
    if (process.env.NODE_ENV !== 'production') {
        livereloadServer = livereload.createServer();

        livereloadServer.watch(path.join(__dirname, '../public'));

        app.use(connectLivereload());

        livereloadServer.once('connection', () => {
            setTimeout(() => livereloadServer.refresh('/'), 100);
        });
    }

    mongo();
    app.use(express.json());
    app.use(express.static(path.join(__dirname, '../public')));
    app.use('/api', routerIndex());
    return app;
}