import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MeetingDto } from '../dto/meeting/meeting.dto';
import { NewMeetingDto } from '../dto/meeting/new-meeting.dto';

@Injectable()
export class MeetingApiService {

  private static readonly getAllMeetingsUrl = '/api/meeting';
  private static readonly createMeetingUrl  = '/api/meeting';

  constructor(
    private readonly http: HttpClient
  ) { }

  getAllMeetings(): Observable<MeetingDto[]> {
    return this.http.get<MeetingDto[]>(MeetingApiService.getAllMeetingsUrl);
  }

  createMeeting(newMeeting: NewMeetingDto): Observable<any> {
    return this.http.post<any>(
      MeetingApiService.createMeetingUrl,
      newMeeting
    );
  }

}
