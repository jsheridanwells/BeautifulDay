import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleModule } from './modules/google/google.module';
import { AppComponent } from './app.component';
import { ProfileModule } from './modules/profile/profile.module';
import { AuthComponent } from './layout/auth/auth.component';
import { ContentComponent } from './layout/content/content.component';
import { AuthGuard } from './core/guards/authGuard';
import { JwtInterceptor } from './core/services/jwt.interceptor';
// import { NoCacheInterceptor } from './core/services/nocache.interceptor';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FooterModalComponent } from './layout/footer/footer-modal/footer-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ContentComponent,
    NavbarComponent,
    FooterComponent,
    FooterModalComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    GoogleModule,
    ProfileModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    // TODO : i thought this would fix the stale data problem. if it';s not useful, remove this and
    // the nocache.interceptor.ts file
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: NoCacheInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
