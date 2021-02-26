import * as express from 'express';
import { Express, Request, Response  } from 'express';
import * as bodyParser from 'body-parser';
import connectDb from './connectDb';
import { authRoutes } from './routes/auth.routes';
import { routerIndex } from './routes/routerIndex';
import * as swaggerUi from 'swagger-ui-express';
// @ts-ignore i don't want to mess with tsconfig just yet and this works
import * as swaggerDoc from './swagger.json';
import { verifyToken } from './util/jwt';
import { AppRequest } from './types/AppRequest';

export function createApp(): Express {
  const app = express();
  connectDb();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  app.use(async (req: AppRequest, res: Response, next) => {
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
