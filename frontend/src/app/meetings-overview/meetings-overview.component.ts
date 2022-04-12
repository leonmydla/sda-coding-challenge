import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment/moment';
import { MeetingDto } from '../common/api/dto/meeting/meeting.dto';
import { MeetingApiService } from '../common/api/meeting/meeting-api.service';
import { ConsistencyNotification } from '../common/consistency/consistency-notification';
import { ConsistencyService } from '../common/consistency/consistency.service';
import { SubscriptionManagerService } from '../common/subscription-manager/subscription-manager.service';

@Component(
  {
    selector   : 'app-meetings-overview',
    templateUrl: './meetings-overview.component.html',
    styleUrls  : ['./meetings-overview.component.scss']
  })
export class MeetingsOverviewComponent implements OnInit, OnDestroy {

  loading                = true;
  error                  = false;
  meetings: MeetingDto[] = [];

  constructor(
    private readonly subscriptionManager: SubscriptionManagerService,
    private readonly meetingApiService: MeetingApiService,
    private readonly consistencyService: ConsistencyService
  ) { }

  ngOnInit(): void {
    this.loadMeetings();
    this.loadMeetingsOnConsistencyNotification();
  }

  ngOnDestroy(): void {
    this.subscriptionManager.unsubscribe(this);
  }

  noMeetingsRegistered(): boolean {
    return this.meetings.length <= 0;
  }

  getLocaleDateTimeString(dateTime: Date): string {
    return moment(dateTime).format('DD.MM.YYYY HH:mm');
  }

  private loadMeetings() {
    this.loading = true;

    this.subscriptionManager.watch(
      this,
      this.meetingApiService.getAllMeetings().subscribe(
        {
          next    : meetings => this.meetings = meetings,
          error   : () => this.setError(),
          complete: () => this.loading = false
        }
      )
    );
  }

  private loadMeetingsOnConsistencyNotification() {
    this.subscriptionManager.watch(
      this,
      this.consistencyService
          .listenTo(ConsistencyNotification.RELOAD_MEETINGS)
          .subscribe(() => this.loadMeetings())
    );
  }

  private setError() {
    this.error = true;
  }
}
