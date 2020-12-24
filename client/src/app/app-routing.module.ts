import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/authGuard';
import { AuthComponent } from './layout/auth/auth.component';
import { ContentComponent } from './layout/content/content.component';
import { GoogleModule } from './modules/google/google.module';
import { ProfileModule } from './modules/profile/profile.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: ContentComponent,
    loadChildren: () => ProfileModule
  },
  {
    path: 'signin',
    component: AuthComponent,
    loadChildren: () => GoogleModule
  },
  {
    path: '**',
    redirectTo: '/signin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
