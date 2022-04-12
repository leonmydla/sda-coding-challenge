import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MeetingApiModule } from '../common/api/meeting/meeting-api.module';
import { SubscriptionManagerModule } from '../common/subscription-manager/subscription-manager.module';
import { MeetingsOverviewComponent } from './meetings-overview.component';
import { MeetingsTableComponent } from './meetings-table/meetings-table.component';


@NgModule(
  {
    declarations: [
      MeetingsOverviewComponent,
      MeetingsTableComponent
    ],
    exports     : [
      MeetingsOverviewComponent
    ],
    imports: [
      CommonModule,
      SubscriptionManagerModule,
      MeetingApiModule,
      MatTableModule,
      MatProgressSpinnerModule,
      MatCardModule,
      MatChipsModule,
      MatExpansionModule
    ]
  })
export class MeetingsOverviewModule {}
