import { Component, OnInit } from '@angular/core';
import { GoogleService } from '../../google.service';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss']
})
export class GoogleComponent implements OnInit {

  constructor(
    private googleService: GoogleService
  ) { }

  ngOnInit() { }

  testSignIn() {
    this.googleService.signIn();
  }
}
