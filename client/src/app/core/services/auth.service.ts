import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'client/src/environments/environment';
import { GoogleAuthService } from "ng-gapi";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static GOOGLE_SESSION_STORAGE_KEY: string = environment.googleSessionStorageKey;
  constructor(
    private http: HttpClient
  ) { }

  isAuthenticated(): boolean {
    const googleToken = sessionStorage.getItem(AuthService.GOOGLE_SESSION_STORAGE_KEY);
    if (!googleToken) {
      return false
    }

    // TODO : send googleToken to back end

    return true;
  }

  validateGoogleSession(): void {
    const googleToken = sessionStorage.getItem(AuthService.GOOGLE_SESSION_STORAGE_KEY);
    if (googleToken) {
    // here, we'll pretend to send the google token and get a jwt back.
      const FAKEJWT = 'heyyouregood';
      this.saveJwt(FAKEJWT);
    }
  }

  private saveJwt(jwt: string): void {
    localStorage.setItem('jwt', jwt);
  }
}
