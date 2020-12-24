import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '@app/services/auth.service';
import { GoogleService } from '@app/services/google.service';
import {ProfileService} from '@app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private googleService: GoogleService,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.googleService.signIn()
      .then(() => {
	return this.authService.validateGoogleSession();
      })
      .then(() => this.subscribeToProfile())
      .catch((err: any) => this.signOut());
  }

  private subscribeToProfile() {
    this.profileService.getProfile()
      .subscribe(res => console.log('subscribe to profile results::: ', res));
  }

  signOut(): void {
    this.googleService.signOut()
      .then(() => this.router.navigate(['/signin']));
  }
}
