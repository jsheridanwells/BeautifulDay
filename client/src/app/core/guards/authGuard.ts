import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {  }
  canActivate(): boolean {
    const authenticated = this.authService.isAuthenticated();
    if (!authenticated) {
      this.router.navigate(['/auth']);
    }
    return authenticated;
  }
}
