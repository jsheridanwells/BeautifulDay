import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { GoogleService } from '@app/services/google.service';
import { HabitService } from '@app/services/habit.service';
import { ProfileModel } from '@app/models/profile.model';
import { HabitModel } from '@app/models/habit.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private router: Router,
    private googleService: GoogleService,
    private authService: AuthService,
    private habitService: HabitService
  ) { }

  currentProfile: ProfileModel | null | undefined;
  habitList: HabitModel[] = [];

  async ngOnInit() {
    try {
      this.authService.profileSubject.subscribe(profile => this.currentProfile = profile);
      this.habitService.listHabits().subscribe(habits => {
        this.habitList = habits;
      })
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
