import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GoogleModule } from './modules/google/google.module';
import { ProfileModule } from './modules/profile/profile.module';
import { AuthComponent } from './layout/auth/auth.component';
import { ContentComponent } from './layout/content/content.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { AuthGuard } from './core/guards/authGuard';
import { JwtInterceptor } from './core/services/JwtInterceptor';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ContentComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleModule,
    ProfileModule,
  ],
  providers: [
    AuthGuard,
    // jwtInterceptorProvider
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
