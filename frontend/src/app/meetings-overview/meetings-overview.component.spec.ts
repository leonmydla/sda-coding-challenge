import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsOverviewComponent } from './meetings-overview.component';

describe('OverviewComponent', () => {
  let component: MeetingsOverviewComponent;
  let fixture: ComponentFixture<MeetingsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
