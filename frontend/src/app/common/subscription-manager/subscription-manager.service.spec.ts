import { TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';
import { SubscriptionManagerService } from '../../../app/common/subscription-manager/subscription-manager.service';
import { AppComponent } from '../../app.component';

describe('SubscriptionManagerService', () => {
  const index = new AppComponent();
  let service: SubscriptionManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        providers: [
          SubscriptionManagerService
        ]
      });

    service = TestBed.inject(SubscriptionManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should unsubscribe from all subscriptions', () => {
    const subscriptions = [new Subscription(), new Subscription(), new Subscription()];

    subscriptions.forEach(
      subscription => spyOn(subscription, 'unsubscribe'));

    subscriptions.forEach(
      subscription => service.watch(index, subscription));

    subscriptions.forEach(
      subscription => expect(subscription.unsubscribe).not.toHaveBeenCalled());

    service.unsubscribe(index);

    subscriptions.forEach(
      subscription => expect(subscription.unsubscribe).toHaveBeenCalledTimes(1));
  });

  it('should not fail if no subscriptions are present', () => {
    service.unsubscribe(index);

    expect(true).toBeTruthy();
  });
});
