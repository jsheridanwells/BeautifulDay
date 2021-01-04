import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faTimes, faCog, faPlus, IconDefinition  } from '@fortawesome/free-solid-svg-icons';
import { GoogleService } from '@app/services/google.service';
import { AuthService } from '@app/services/auth.service';
import { ProfileModel } from '@app/models/profile.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private googleService: GoogleService,
    private authService: AuthService,
    private router: Router
  ) { }

  faBars: IconDefinition = faBars;
  faTimes: IconDefinition = faTimes;
  faPlus: IconDefinition = faPlus;
  faCog: IconDefinition = faCog;
  showMenu: boolean = false
  currentProfile: ProfileModel | null;

  ngOnInit(): void {
    this.showMenu = false;
    this.authService.profileSubject.subscribe(profile => {
      this.currentProfile = profile;
    });
  }

  toggleHamburgerMenu(): void {
    this.showMenu = !this.showMenu;
  }

  requestSignOut(): void {
    this.googleService.signOut()
      .then(() => this.router.navigate(['/signin']));
  }
}
