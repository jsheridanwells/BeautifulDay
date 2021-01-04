import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { GoogleService } from "../services/google.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private googleService: GoogleService,
    private router: Router
  ) {  }

  canActivate(): boolean | Promise<boolean>  {
    const session = this.googleService.getToken();
    console.log('authguard check session', session);
    if (!session) {
      this.router.navigate(['/signin']);
    }
    return this.googleService.checkSignedIn()
      .then(signedIn => {
        if (!signedIn) {
          this.router.navigate(['/signin']);
          return false;
        }
        return true;
      });
  }
}
