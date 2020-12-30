import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { GoogleService } from '@app/services/google.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private googleService: GoogleService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    try {
      this.authService.validateGoogleSession().subscribe(res => {
        console.log('res from profile component', res);
      },
      err => {
        console.error('err from observable?', err);
        this.googleService.signOut().then(() => {
          this.router.navigate(['/signin']);
        });
      });
    } catch (err) {
      console.error('or err in catch?', err);
      this.googleService.signOut().then(() => {
        this.router.navigate(['/signin']);
      });
    }
  }

  signOut(): void {
    this.googleService.signOut()
      .then(() => this.router.navigate(['/signin']));
  }
}
