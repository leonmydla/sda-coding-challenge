import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment/moment';
import { MeetingDto } from '../../common/api/dto/meeting/meeting.dto';

@Component({
  selector: 'app-meetings-table',
  templateUrl: './meetings-table.component.html',
  styleUrls: ['./meetings-table.component.scss']
})
export class MeetingsTableComponent{

  @Input('meetings')
  meetings?: MeetingDto[];

  getLocaleDateTimeString(dateTime: Date): string {
    return moment(dateTime).format('DD.MM.YYYY HH:mm');
  }

}
