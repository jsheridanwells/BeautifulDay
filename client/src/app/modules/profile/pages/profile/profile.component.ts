import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { GoogleService } from '@app/services/google.service';
import { ProfileModel } from '@app/models/profile.model';

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

  currentProfile: ProfileModel | null;

  async ngOnInit() {
    try {
      await this.authService.validateGoogleSession();
      this.authService.profileSubject.subscribe(profile => this.currentProfile = profile);
    } catch (err) {
      console.error(err);
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
