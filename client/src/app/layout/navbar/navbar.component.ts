import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleService } from '@app/services/google.service';
import { faBars, faTimes, IconDefinition  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private googleService: GoogleService,
    private router: Router
  ) { }

  faBars: IconDefinition = faBars;
  faTimes: IconDefinition = faTimes;
  showMenu: boolean = false

  ngOnInit(): void {
    this.showMenu = false;
  }

  toggleHamburgerMenu(): void {
    this.showMenu = !this.showMenu;
  }

  requestSignOut(): void {
    this.googleService.signOut()
      .then(() => this.router.navigate(['/signin']));
  }
}
