import * as dotenv from 'dotenv';
dotenv.config();

export class AppConfig {
  appSecret = process.env.APP_SECRET;
  tokenExpiration = 60*60*24; // 24 hours
  port = process.env.APP_PORT || 3000;
  mongoDsn = process.env.MONGO_DSN || 'mongodb://localhost:27017/pelotonPlanner';
}
