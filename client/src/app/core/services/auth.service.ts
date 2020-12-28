import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'client/src/environments/environment';
import { ProfileModel } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static GOOGLE_SESSION_STORAGE_KEY: string = environment.googleSessionStorageKey;
  public static JWT_KEY: string = environment.jwtKey;
  constructor(
    private http: HttpClient
  ) { }

  isAuthenticated(): boolean {
    const googleToken = sessionStorage.getItem(AuthService.GOOGLE_SESSION_STORAGE_KEY);
    return googleToken ? true : false;
  }

  validateGoogleSession(): Observable<ProfileModel> {
    const idToken = sessionStorage.getItem(AuthService.GOOGLE_SESSION_STORAGE_KEY);
    if (idToken) {
      return this.http.post<ProfileModel>('/auth', { idToken })
        .pipe(map(res => {
          this.saveJwt(res.token);
          return res;
        }))
    } else {
      throw new Error();
    }
  }

  getJwt(): string | null {
    return localStorage.getItem(AuthService.JWT_KEY);
  }

  private saveJwt(jwt: string | undefined): void {
    if (jwt) {
      localStorage.setItem(AuthService.JWT_KEY, jwt);
    }
  }
}
