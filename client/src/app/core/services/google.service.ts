import { Injectable } from "@angular/core";
// @ts-ignore - stupid linter can't figure out tsconfig paths >:(
import { environment } from '@env/environment';
import { GoogleAuthService } from "ng-gapi";

@Injectable()
export class GoogleService {
  // public static GOOGLE_SESSION_STORAGE_KEY: string = environment.googleSessionStorageKey;
  public static GOOGLE_SESSION_STORAGE_KEY = 'googleSessionStorageKey';
  constructor(
      private googleAuth: GoogleAuthService
    ) {  }

  getToken(): string | null {
    const token = sessionStorage.getItem(GoogleService.GOOGLE_SESSION_STORAGE_KEY);
    if (!token) {
      return null;
    }
    return sessionStorage.getItem(GoogleService.GOOGLE_SESSION_STORAGE_KEY);
  }

  async checkSignedIn(): Promise<boolean> {
    return await this.googleAuth.getAuth()
      .toPromise().then(auth => auth.isSignedIn.get());
  }

  async signIn(): Promise<any> {
    return this.googleAuth.getAuth().toPromise()
      .then(auth => auth.signIn())
      .then(user => {
        const token = user.getAuthResponse().id_token;
        this.saveSignIn(token);
      });
  }

  async signOut(): Promise<any> {
    return this.googleAuth.getAuth().toPromise()
      .then(auth => auth.signOut())
      .then(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
  }

  private saveSignIn(token: string): void {
    sessionStorage.setItem(GoogleService.GOOGLE_SESSION_STORAGE_KEY, token);
  }
}