import { google, Auth } from 'googleapis';
import GoogleKeys from '../config/google.config';

const googleKeys = new GoogleKeys();
const oAuthClient: Auth.OAuth2Client = new google.auth.OAuth2(
  googleKeys.clientId,
  googleKeys.clientSecret
);

export default oAuthClient;
