
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'client/src/environments/environment';

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
    return true;
  }

  async validateGoogleSession(): Promise<any> {
    new Promise((res, rej) => {
      this.saveJwt('MOCKJWT');
      res();
    });
  }

  getJwt(): string | null {
    return localStorage.getItem(AuthService.JWT_KEY);
  }

  private saveJwt(jwt: string): void {
    localStorage.setItem(AuthService.JWT_KEY, jwt);
  }
}
