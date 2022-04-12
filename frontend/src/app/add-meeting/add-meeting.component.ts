import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment/moment';
import { map, Observable, startWith } from 'rxjs';
import { NewMeetingDto } from '../common/api/dto/meeting/new-meeting.dto';
import { MinimalPersonDto } from '../common/api/dto/person/minimal-person.dto';
import { NewPersonDto } from '../common/api/dto/person/new-person.dto';
import { MeetingApiService } from '../common/api/meeting/meeting-api.service';
import { PersonApiService } from '../common/api/person/person-api.service';
import { ConsistencyNotification } from '../common/consistency/consistency-notification';
import { ConsistencyService } from '../common/consistency/consistency.service';
import { SubscriptionManagerService } from '../common/subscription-manager/subscription-manager.service';

@Component(
  {
    selector   : 'app-add-meeting',
    templateUrl: './add-meeting.component.html',
    styleUrls  : ['./add-meeting.component.scss']
  })
export class AddMeetingComponent implements OnInit, OnDestroy {

  loading                                             = true;
  error                                               = false;
  horribleError                                       = false;
  autocompletePersons: Observable<MinimalPersonDto[]> = new Observable();
  formGroup                                           = this.formBuilder.group(
    {
      person     : ['', Validators.required],
      dateTime   : ['', Validators.required],
      coordinates: ['', Validators.required],
    }
  );
  persons?: MinimalPersonDto[];

  constructor(
    private readonly subscriptionManager: SubscriptionManagerService,
    private readonly personApiService: PersonApiService,
    private readonly meetingApiService: MeetingApiService,
    private readonly consistencyService:ConsistencyService,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadPersons();
  }

  ngOnDestroy(): void {
    this.subscriptionManager.unsubscribe(this);
  }

  submit() {
    const dateTime        = moment(this.formGroup.get('dateTime')?.value).utc(true).toDate();
    const coordinates     = this.formGroup.get('coordinates')?.value;
    const personName      = this.formGroup.get('person')?.value;
    const existingPersons = this.persons!!.filter(person => person.name == personName);

    if (existingPersons.length > 1) {
      this.horribleError = true;
      return;
    }

    const newMeeting = new NewMeetingDto(
      0,
      dateTime,
      coordinates
    )

    if(existingPersons.length <= 0) {
      const newPerson = new NewPersonDto(personName);

      this.createMeetingWithNewPerson(newPerson, newMeeting);
      return;
    }

    newMeeting.personId = existingPersons.pop()!!.id;

    this.createMeeting(newMeeting);
  }

  private createMeetingWithNewPerson(newPerson: NewPersonDto, newMeeting: NewMeetingDto) {
    this.subscriptionManager.watch(
      this,
      this.personApiService.createPerson(newPerson).subscribe(
        {
          next : person => {
            this.error = true
            newMeeting.personId = person.id;

            this.loadPersons();
            this.createMeeting(newMeeting);
          },
          error: () => this.error = true
        })
    );
  }

  private createMeeting(newMeeting: NewMeetingDto) {
    this.subscriptionManager.watch(
      this,
      this.meetingApiService.createMeeting(newMeeting).subscribe(
        {
          next : () => {
            this.error = false;

            this.consistencyService.notify(ConsistencyNotification.RELOAD_MEETINGS);
          },
          error: () => this.error = true
        })
    );
  }

  private loadPersons() {
    this.loading = true;

    this.subscriptionManager.watch(
      this,
      this.personApiService.getAllPersons().subscribe(
        {
          next    : persons => {
            this.persons = persons;

            this.setUpPersonsAutocomplete();
          },
          complete: () => this.loading = false
        })
    );
  }

  private setUpPersonsAutocomplete() {
    this.autocompletePersons = this
      .formGroup
      .controls['person']
      .valueChanges
      .pipe(
        startWith(''),
        map(inputValue => {
          const filterValue = inputValue.toLocaleLowerCase();

          return this.persons!!.filter(person => {
            const name = person.name.toLocaleLowerCase();

            return name.includes(filterValue);
          });
        })
      );
  }
}
