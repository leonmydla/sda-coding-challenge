import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment/moment';
import { MeetingDto } from '../common/api/dto/meeting/meeting.dto';
import { MinimalPersonDto } from '../common/api/dto/person/minimal-person.dto';
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

  loading                     = true;
  error                       = false;
  meetings: MeetingDto[]      = [];
  meetingsByPerson: {
    person: MinimalPersonDto,
    meetings: MeetingDto[]
  }[]                         = [];
  meetingsByDateTime: {
    dateTime: Date,
    meetings: MeetingDto[]
  }[]                         = [];
  persons: MinimalPersonDto[] = [];
  groupBy: string             = '';

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

  setGroupBy(groupingTarget: string) {
    this.groupBy = groupingTarget;
  }

  isGroupedBy(groupingTarget: string): boolean {
    return this.groupBy == groupingTarget;
  }

  generateMeetingsGroupedByPerson() {
    const uniquePersons: MinimalPersonDto[] = [];

    this.meetings
        .map(it => it.person)
        .forEach(person => {
          const personExists = uniquePersons.filter(it => it.id == person.id).length >= 1;

          if (personExists) {
            return;
          }

          uniquePersons.push(person);
        });

    this.meetingsByPerson = uniquePersons.map(
      person => {
        return {
          person  : person,
          meetings: this.meetings.filter(meeting => meeting.person.id == person.id)
        };
      });
  }

  generateMeetingsGroupedByDateTime() {
    const uniqueDateTimes: Date[] = [];

    this.meetings
        .map(it => it.dateTime)
        .forEach(date => {
          const dateTimeExists = uniqueDateTimes.filter(it => moment(it).isSame(date, "day")).length >= 1;

          if (dateTimeExists) {
            return;
          }

          uniqueDateTimes.push(date);
        });

    this.meetingsByDateTime = uniqueDateTimes.map(
      date => {
        return {
          dateTime: date,
          meetings: this.meetings.filter(meeting => moment(meeting.dateTime).isSame(date, "day"))
        };
      });
  }

  getLocaleDateString(dateTime: Date): string {
    return moment(dateTime).format('DD.MM.YYYY');
  }

  private loadMeetings() {
    this.loading = true;

    this.subscriptionManager.watch(
      this,
      this.meetingApiService.getAllMeetings().subscribe(
        {
          next    : meetings => this.updateMeetings(meetings),
          error   : () => this.setError(),
          complete: () => this.loading = false
        }
      )
    );
  }

  private updateMeetings(meetings: MeetingDto[]) {
    this.meetings = this.sortMeetingsByDateTime(meetings);
    this.generateMeetingsGroupedByDateTime();
    this.generateMeetingsGroupedByPerson();
  }

  private sortMeetingsByDateTime(meetings: MeetingDto[]): MeetingDto[] {
    return meetings.sort(
      (a, b) =>
        moment(a.dateTime).isBefore(b.dateTime) ? 1 : -1);
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
