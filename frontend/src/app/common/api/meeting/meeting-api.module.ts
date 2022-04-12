import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MeetingApiService } from './meeting-api.service';

@NgModule(
  {
    imports  : [
      HttpClientModule
    ],
    providers: [
      MeetingApiService
    ]
  })
export class MeetingApiModule {}
