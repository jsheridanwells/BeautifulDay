import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleComponent } from './pages/google/google.component';
import { GoogleRoutingModule } from './google-routing.module';
import {GoogleApiModule, NG_GAPI_CONFIG, NgGapiClientConfig} from 'ng-gapi';
import { environment } from '../../../environments/environment';
import { GoogleService } from './google.service';

const gapiClientConfig : NgGapiClientConfig = {
  client_id: environment.googleClientId,
  discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile"
  ].join(" ")
};

@NgModule({
  declarations: [GoogleComponent],
  imports: [
    CommonModule,
    GoogleRoutingModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    })
  ],
  providers: [
    GoogleService
  ]
})
export class GoogleModule { }
