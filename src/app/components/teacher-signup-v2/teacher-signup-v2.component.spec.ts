import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSignupV2Component } from './teacher-signup-v2.component';

describe('TeacherSignupV2Component', () => {
  let component: TeacherSignupV2Component;
  let fixture: ComponentFixture<TeacherSignupV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherSignupV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSignupV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
