import { Injectable } from "@angular/core";
import { environment } from "client/src/environments/environment";
import { GoogleAuthService } from "ng-gapi";

@Injectable()
export class GoogleService {
  public static GOOGLE_SESSION_STORAGE_KEY: string = environment.googleSessionStorageKey;
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

  signIn(): void {
    this.googleAuth.getAuth()
      .subscribe(auth => {
        auth.signIn().then(res => this.saveSignIn(res));
      })
  }

  private saveSignIn(res: gapi.auth2.GoogleUser): void {
    const token = res.getAuthResponse().access_token;
    debugger;
    sessionStorage.setItem(GoogleService.GOOGLE_SESSION_STORAGE_KEY, res.getAuthResponse().access_token);
  }
}
