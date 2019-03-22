import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPatientPrescriptionComponent } from './view-patient-prescription.component';

describe('ViewPatientPrescriptionComponent', () => {
  let component: ViewPatientPrescriptionComponent;
  let fixture: ComponentFixture<ViewPatientPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPatientPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPatientPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
