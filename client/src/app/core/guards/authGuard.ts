import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { GoogleService } from "../services/google.service";
import { AuthService }from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private googleService: GoogleService,
    private authService: AuthService,
    private router: Router
  ) {  }

  canActivate(): boolean | Promise<boolean>  {
    const session = this.googleService.getToken();
    const token = this.authService.getJwt();
    if (!session || !token) {
      this.handleReroute().then(() => false);
    }
    return this.googleService.checkSignedIn()
      .then(signedIn => {
        if (!signedIn) {
          this.handleReroute().then(() => false);
        }
        return true;
      });
  }

  private async handleReroute(): Promise<any> {
    await this.googleService.signOut();
    this.router.navigate(['/signing']);
  }
}

