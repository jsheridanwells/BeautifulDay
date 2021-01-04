import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HabitModel } from '@app/models/habit.model';

@Injectable({
  providedIn: 'root'
})
export class HabitService {

  constructor(
    private http: HttpClient
  ) { }

  private endpoint = '/api/habits';

  listHabits(): Observable<HabitModel[]> {
    return this.http.get<HabitModel[]>(this.endpoint);
  }

  createHabit(habit: any) {
    return this.http.post<any>(this.endpoint, habit).toPromise();
  }

}
