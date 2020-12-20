import * as dotenv from 'dotenv';

dotenv.config();

export default class GoogleKeys {
  clientId: string | undefined = process.env.GOOGLE_CLIENT_ID;
  clientSecret: string | undefined = process.env.GOOGLE_CLIENT_SECRET;
  redirect: string | undefined = process.env.GOOGLE_REDIRECT_URI;
}
