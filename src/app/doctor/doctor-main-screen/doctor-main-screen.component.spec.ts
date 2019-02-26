import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorMainScreenComponent } from './doctor-main-screen.component';

describe('DoctorMainScreenComponent', () => {
  let component: DoctorMainScreenComponent;
  let fixture: ComponentFixture<DoctorMainScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorMainScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorMainScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
