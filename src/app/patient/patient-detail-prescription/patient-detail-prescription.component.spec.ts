import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailPrescriptionComponent } from './patient-detail-prescription.component';

describe('PatientDetailPrescriptionComponent', () => {
  let component: PatientDetailPrescriptionComponent;
  let fixture: ComponentFixture<PatientDetailPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDetailPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
