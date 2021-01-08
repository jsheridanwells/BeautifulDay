import * as mongoose from 'mongoose';
import { ConnectionOptions } from 'mongoose';

export function mongo(): void {
  const uri = buildUri();
  const mongoConfig: ConnectionOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
  };

  mongoose.connect(uri, mongoConfig).then(() => {
      console.log('Application is connected to MongoDb.');
  })
  .catch(err => console.error('Mongoose error ::: ', err));
}

// Build connection string for Mongoose based on current env.
function buildUri(): string {
  const appUsername = process.env.BD_USER || 'bdUser';
  const appPassword = process.env.BD_PWD || 'bdUser()';
  const host = process.env.DB_HOST || 'localhost';
  const port = process.env.DB_PORT || 28017;
  const dbName = process.env.DB_NAME || 'beautifulDay';
  return `mongodb://${ appUsername }:${ appPassword }@${ host }:${ port }/${ dbName }`;
}


