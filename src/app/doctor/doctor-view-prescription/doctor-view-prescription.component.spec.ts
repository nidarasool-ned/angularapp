import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorViewPrescriptionComponent } from './doctor-view-prescription.component';

describe('DoctorViewPrescriptionComponent', () => {
  let component: DoctorViewPrescriptionComponent;
  let fixture: ComponentFixture<DoctorViewPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorViewPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorViewPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
