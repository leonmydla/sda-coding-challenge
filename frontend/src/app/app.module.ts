import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddMeetingModule } from './add-meeting/add-meeting.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeetingsOverviewModule } from './meetings-overview/meetings-overview.module';

@NgModule(
  {
    declarations: [
      AppComponent
    ],
    imports     : [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MeetingsOverviewModule,
      AddMeetingModule
    ],
    providers   : [],
    bootstrap   : [AppComponent]
  })
export class AppModule {}
