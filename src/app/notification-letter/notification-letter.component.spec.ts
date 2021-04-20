import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationLetterComponent } from './notification-letter.component';

describe('NotificationLetterComponent', () => {
  let component: NotificationLetterComponent;
  let fixture: ComponentFixture<NotificationLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
