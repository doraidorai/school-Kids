import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeroComponent } from './zero.component';

describe('ZeroComponent', () => {
  let component: ZeroComponent;
  let fixture: ComponentFixture<ZeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
