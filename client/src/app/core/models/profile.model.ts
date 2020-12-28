export interface ProfileModel {
  profileId: string;
  givenName: string;
  familyName: string;
  email: string;
  picture: string;
  token: string | undefined;
}
