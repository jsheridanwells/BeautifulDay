
// TODO : delete this class. All this is being don in Auth service now

import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {UserProfileModel} from '@app/models/userProfile.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
  ) { }

  getProfile(): Observable<UserProfileModel> {
    return this.http.get<UserProfileModel>('/api/profile');
  }
}
