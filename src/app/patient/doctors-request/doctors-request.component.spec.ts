import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsRequestComponent } from './doctors-request.component';

describe('DoctorsRequestComponent', () => {
  let component: DoctorsRequestComponent;
  let fixture: ComponentFixture<DoctorsRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorsRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
