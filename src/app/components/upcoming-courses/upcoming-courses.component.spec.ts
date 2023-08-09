import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingCoursesComponent } from './upcoming-courses.component';

describe('UpcomingCoursesComponent', () => {
  let component: UpcomingCoursesComponent;
  let fixture: ComponentFixture<UpcomingCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
