import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleService } from '@app/services/google.service';
import { AuthService } from 'client/src/app/core/services/auth.service';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss']
})
export class GoogleComponent implements OnInit {

  constructor(
    private googleService: GoogleService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isSignedIn().then(signedIn => {
      if (signedIn)
        this.router.navigate(['/home']);
    });
  }

  googleSignIn():void {
    this.googleService.signIn()
      .then(() => this.authService.validateGoogleSession())
      .then(() => this.router.navigate(['/home'])
      .catch(err => {
       console.error(err);
       this.router.navigate(['/signin']);
     }));
  }

  async isSignedIn(): Promise<boolean> {
    return await this.googleService.checkSignedIn();
  }
}
