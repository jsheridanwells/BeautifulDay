import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleService } from '@app/services/google.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private googleService: GoogleService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  signOut(): void {
    this.googleService.signOut()
      .then(() => this.router.navigate(['/auth']));
  }
}
