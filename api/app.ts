import * as express from 'express';
import { Express } from 'express';
import * as path from 'path';
// import * as livereload from 'livereload';
// import * as connectLivereload from 'connect-livereload';
import * as bodyParser from 'body-parser';
import { mongo } from './mongo';
// import { seedModuleList } from './util/seedModuleList';
import { authRoutes } from './routes/auth.routes';
import { routerIndex } from './routes/routerIndex';
import * as swaggerUi from 'swagger-ui-express';
// @ts-ignore i don't want to message with tsconfig just yet and this works
import * as swaggerDoc from './swagger.json';
import { verifyToken } from './util/jwt';

export default function createApp(): Express {
  const app = express();
  const clientDir = express.static(path.join(__dirname, '../public'));
  // This was supposed to refresh the browser when the client code changed
  // but Google Chrome right now doesn't like the script loading policy.
  // Nice to have, but more trouble than it's worth.
  // let livereloadServer: any;
    // if (process.env.NODE_ENV !== 'production') {
    //     livereloadServer = livereload.createServer();
    //     livereloadServer.watch(path.join(__dirname, '../public'));
    //     app.use(connectLivereload());

    //         setTimeout(() => livereloadServer.refresh('/'), 100);
    //     });
    // }
  mongo();
  // seedModuleList();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(clientDir);
  app.use('/signin', clientDir);
  app.use('/home', clientDir);
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
      return res.status(401).send(err);
    }
  });
  app.use('/auth', authRoutes());
  app.use('/api', routerIndex());
  return app;
}
