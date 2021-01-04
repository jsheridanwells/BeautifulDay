import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewHabitComponent } from './pages/new-habit/new-habit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/habit/new',
    pathMatch: 'full'
  },
  {
    path: 'new',
    component: NewHabitComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HabitRoutingModule { }
