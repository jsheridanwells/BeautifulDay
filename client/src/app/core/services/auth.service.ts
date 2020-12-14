import { Injectable } from '@angular/core';
import { environment } from 'client/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static GOOGLE_SESSION_STORAGE_KEY: string = environment.googleSessionStorageKey;
  constructor() {}

  isAuthenticated(): boolean {
    debugger;
    const googleToken = sessionStorage.getItem(AuthService.GOOGLE_SESSION_STORAGE_KEY);
    if (!googleToken) {
      return false
    }

    // TODO : send googleToken to back end

    return true;
  }
}
