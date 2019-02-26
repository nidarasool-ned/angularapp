import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDetailPrescriptionComponent } from './doctor-detail-prescription.component';

describe('DoctorDetailPrescriptionComponent', () => {
  let component: DoctorDetailPrescriptionComponent;
  let fixture: ComponentFixture<DoctorDetailPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorDetailPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorDetailPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
