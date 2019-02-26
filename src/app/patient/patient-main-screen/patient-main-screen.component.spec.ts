import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMainScreenComponent } from './patient-main-screen.component';

describe('PatientMainScreenComponent', () => {
  let component: PatientMainScreenComponent;
  let fixture: ComponentFixture<PatientMainScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientMainScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMainScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
