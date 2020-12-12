import * as mongoose from 'mongoose';
import { ConnectionOptions } from 'mongoose';

export function mongo(): void {
  const uri = process.env.MONGO_DSN || 'mongodb://localhost:27017/beautifulDay';
  const mongoConfig: ConnectionOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
  };

  mongoose.connect(uri, mongoConfig).then(() => {
      console.log('Application is connected to MongoDb.');
  });
}

// export default mongo;