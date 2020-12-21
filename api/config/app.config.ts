import * as dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';
dotenv.config();

const secret: Secret = process.env.APP_SECRET || 'UNSAFE TEST SECRET!!!';

export default {
  appSecret: secret,
  tokenExpiration: 60*60*24, // 24 hours
  port: process.env.APP_PORT || 3000,
  mongoDsn: process.env.MONGO_DSN || 'mongodb://localhost:27017/pelotonPlanner'
}

