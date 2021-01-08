import { config } from 'dotenv';
import * as express from 'express';
import { Express  } from 'express';
import * as path from 'path';
import * as livereload from 'livereload';
import * as connectLivereload from 'connect-livereload';
import * as bodyParser from 'body-parser';
import { mongo } from './mongo';
import { authRoutes } from './routes/auth.routes';
import { routerIndex } from './routes/routerIndex';
import * as swaggerUi from 'swagger-ui-express';
// @ts-ignore i don't want to mess with tsconfig just yet and this works
import * as swaggerDoc from './swagger.json';
import { verifyToken } from './util/jwt';

export default function createApp(): Express {
  config();
  const app = express();
  const clientDir = path.join(__dirname, '../public');

  // in development, refresh angular on save just like ng serve does
  let livereloadServer: any;
  if (process.env.NODE_ENV !== 'production') {
      livereloadServer = livereload.createServer();
      livereloadServer.watch(clientDir);
      app.use(connectLivereload());
      livereloadServer.once('connection', () => {
              setTimeout(() => livereloadServer.refresh('/'), 100);
      });
  }

  mongo();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(clientDir));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  app.use(async (req, res, next) => {
    try {
      req.user = null;
      if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
          const tokenResult = await verifyToken(token);
          if (tokenResult) {
            req.user = { googleSubId: tokenResult.googleSubId, profileId: tokenResult.profileId };
          }
        }
      }
      return next();
    } catch(err: any){
      return res.status(500).send(err);
    }
  });
  app.use('/auth', authRoutes());
  app.use('/api', routerIndex());
  app.use((req, res) => res.status(404).send('not found :('));
  return app;
}
