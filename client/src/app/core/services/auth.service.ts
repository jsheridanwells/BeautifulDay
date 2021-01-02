import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'client/src/environments/environment';
import { ProfileModel } from '../models/profile.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static GOOGLE_SESSION_STORAGE_KEY: string = environment.googleSessionStorageKey;
  public static JWT_KEY: string = environment.jwtKey;
  constructor(
    private http: HttpClient
  ) { }

  profileSubject: BehaviorSubject<ProfileModel | null> = new BehaviorSubject<ProfileModel | null>(null);

 isAuthenticated(): boolean {
    const googleToken = sessionStorage.getItem(AuthService.GOOGLE_SESSION_STORAGE_KEY);
    return googleToken ? true : false;
  }

  async validateGoogleSession(): Promise<any> {
    const idToken = sessionStorage.getItem(AuthService.GOOGLE_SESSION_STORAGE_KEY);
    if (idToken) {
      this.http.post<ProfileModel>('/auth', { idToken })
        .subscribe(res => {
          this.profileSubject.next(res);
          this.saveJwt(res.token);
        }, err => console.error(err));
    } else {
      throw new Error('Invalid Google authentication.');
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
