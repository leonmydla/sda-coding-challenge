import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MeetingApiModule } from '../common/api/meeting/meeting-api.module';
import { PersonApiModule } from '../common/api/person/person-api.module';
import { SubscriptionManagerModule } from '../common/subscription-manager/subscription-manager.module';
import { AddMeetingComponent } from './add-meeting.component';


@NgModule(
  {
    declarations: [
      AddMeetingComponent
    ],
    exports     : [
      AddMeetingComponent
    ],
    imports: [
      CommonModule,
      SubscriptionManagerModule,
      MeetingApiModule,
      PersonApiModule,
      MatProgressSpinnerModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatAutocompleteModule,
      ReactiveFormsModule,
      MatButtonModule
    ]
  })
export class AddMeetingModule {}
