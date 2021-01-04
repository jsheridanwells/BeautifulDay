import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewHabitComponent } from './pages/new-habit/new-habit.component';
import { HabitRoutingModule } from './habit-routing.module';

@NgModule({
  declarations: [NewHabitComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HabitRoutingModule
  ]
})
export class HabitModule { }
