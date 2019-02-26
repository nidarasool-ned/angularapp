import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAddPrescriptionComponent } from './doctor-add-prescription.component';

describe('DoctorAddPrescriptionComponent', () => {
  let component: DoctorAddPrescriptionComponent;
  let fixture: ComponentFixture<DoctorAddPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorAddPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAddPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
