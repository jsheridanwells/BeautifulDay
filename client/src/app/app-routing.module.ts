import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/authGuard';
import { AuthComponent } from './layout/auth/auth.component';
import { ContentComponent } from './layout/content/content.component';
import { GoogleModule } from './modules/google/google.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: ContentComponent,
    // load children
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => GoogleModule
  },
  {
    path: '**',
    redirectTo: '/auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
