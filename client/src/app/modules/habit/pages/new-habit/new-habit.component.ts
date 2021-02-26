import { Component, OnInit } from '@angular/core';
import { FormBuilder  } from '@angular/forms';
import { HabitService } from '@app/services/habit.service';

@Component({
  selector: 'app-new-habit',
  templateUrl: './new-habit.component.html',
  styleUrls: ['./new-habit.component.scss']
})
export class NewHabitComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private habitService: HabitService
  ) { }

  ngOnInit(): void {
  }

  habitForm = this.formBuilder.group({
    name: [''],
    frequency: [''],
    startDate: [''],
    endDate: [''],
  })

  onSubmit() {
    this.habitService.createHabit(this.habitForm.value);
  }
}
