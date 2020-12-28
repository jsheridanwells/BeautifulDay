import { Injectable } from "@angular/core";
import { environment } from '@env/environment';
import { GoogleAuthService } from "ng-gapi";

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  public static GOOGLE_SESSION_STORAGE_KEY: string = environment.googleSessionStorageKey;
  constructor(
      private googleAuth: GoogleAuthService
    ) {  }

  getToken(): string | null {
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
