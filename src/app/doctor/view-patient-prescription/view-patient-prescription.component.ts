import { Component, OnInit, Inject } from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PatientDetailPrescriptionComponent } from 'src/app/patient/patient-detail-prescription/patient-detail-prescription.component';

@Component({
  selector: 'app-view-patient-prescription',
  templateUrl: './view-patient-prescription.component.html',
  styleUrls: ['./view-patient-prescription.component.css']
})
export class ViewPatientPrescriptionComponent implements OnInit {

  prescriptionObject: any = {};
  patientsResponse: any;
  patientsArray: any[];
  patient: any = {};

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router, private http: Http) { }

  ngOnInit() {
    this.prescriptionObject = JSON.parse(this.storage.get("prescription"));
    let patientId = this.storage.get("id_of_patient");
    this.http.get('https://e-prescription-api.herokuapp.com/patient_by_id/'+patientId).subscribe(response => {
        this.patientsResponse = response.json();
        this.patientsArray = this.patientsResponse["data"];
        this.patient = this.patientsArray[0];
      });
  }

  goToPreviousPage()
  {
    this.router.navigate(['/doctor/view-patient/'+this.patient.patient_id])
  }

}
