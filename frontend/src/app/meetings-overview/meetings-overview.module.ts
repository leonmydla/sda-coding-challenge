import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MeetingApiModule } from '../common/api/meeting/meeting-api.module';
import { SubscriptionManagerModule } from '../common/subscription-manager/subscription-manager.module';
import { MeetingsOverviewComponent } from './meetings-overview.component';


@NgModule(
  {
    declarations: [
      MeetingsOverviewComponent
    ],
    exports     : [
      MeetingsOverviewComponent
    ],
    imports     : [
      CommonModule,
      SubscriptionManagerModule,
      MeetingApiModule,
      MatTableModule,
      MatProgressSpinnerModule,
      MatCardModule
    ]
  })
export class MeetingsOverviewModule {}
