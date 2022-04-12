import { Injectable } from '@angular/core';
import { filter, Subject } from 'rxjs';
import { ConsistencyNotification } from './consistency-notification';

@Injectable({ providedIn: 'root' })
export class ConsistencyService {

  private notifications = new Subject<ConsistencyNotification>();

  notify(notification: ConsistencyNotification) {
    this.notifications.next(notification);
  }

  listenTo(notification: ConsistencyNotification) {
    return this.notifications.pipe(filter(it => it == notification));
  }

}
