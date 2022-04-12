import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class SubscriptionManagerService {

  private subsciptionPool: Map<any, Subscription[]> = new Map<any, Subscription[]>();

  public watch(clazz: any, subscription: Subscription): void {
    const subscriptions = this.getSpace(clazz);

    subscriptions.push(subscription);
  }

  public unsubscribe(clazz: any): void {
    if (!this.subsciptionPool.has(clazz)) {
      return;
    }

    const subscriptions = this.subsciptionPool.get(clazz) as Subscription[];

    subscriptions.forEach(it => it.unsubscribe());
  }

  private getSpace(clazz: any): Subscription[] {
    if (!this.subsciptionPool.has(clazz)) {
      this.subsciptionPool.set(clazz, []);
    }

    return this.subsciptionPool.get(clazz) as Subscription[];
  }
}
