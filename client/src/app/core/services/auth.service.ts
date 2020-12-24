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
    const googleToken = sessionStorage.getItem(AuthService.GOOGLE_SESSION_STORAGE_KEY);
    return googleToken ? true : false;
  }

  async validateGoogleSession(): Promise<any> {
    const idToken = sessionStorage.getItem(AuthService.GOOGLE_SESSION_STORAGE_KEY);
    if (idToken) {
      this.http.post('/auth', { idToken }).toPromise()
	.then((res: any) => {
	  this.saveJwt(res.token);
	})
	.catch((err: any) => err);
    } else {
      throw new Error('Google authentication failed');
    }
  }

  getJwt(): string | null {
    return localStorage.getItem(AuthService.JWT_KEY);
  }

  private saveJwt(jwt: string): void {
    localStorage.setItem(AuthService.JWT_KEY, jwt);
  }
}
