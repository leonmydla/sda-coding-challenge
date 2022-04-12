import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as moment from 'moment/moment';
import { MeetingDto } from '../../common/api/dto/meeting/meeting.dto';

@Component(
  {
    selector   : 'app-meetings-table',
    templateUrl: './meetings-table.component.html',
    styleUrls  : ['./meetings-table.component.scss']
  })
export class MeetingsTableComponent {

  @Input('meetings')
  meetings?: MeetingDto[];


  constructor(
    private readonly sanitizer: DomSanitizer
  ) { }

  getLocaleDateTimeString(dateTime: Date): string {
    return moment(dateTime).format('DD.MM.YYYY HH:mm');
  }

  getOpenStreetmapURI(coordinates: string): SafeResourceUrl {
    const openStreetmapURI = 'https://www.openstreetmap.org/export/embed.html?bbox=' + coordinates.replace(',', '%2C');

    return this.sanitizer.bypassSecurityTrustResourceUrl(openStreetmapURI);
  }

}
