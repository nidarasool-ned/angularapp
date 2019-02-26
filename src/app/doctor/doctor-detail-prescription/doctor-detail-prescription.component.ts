import { Component, OnInit, Inject } from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'app-doctor-detail-prescription',
  templateUrl: './doctor-detail-prescription.component.html',
  styleUrls: ['./doctor-detail-prescription.component.css']
})
export class DoctorDetailPrescriptionComponent implements OnInit {

  prescriptionObject: any = {};
  patientsResponse: any;
  patientsArray: any[];
  patient: any = {};

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router, private http: Http) { }

  ngOnInit() {
    this.prescriptionObject = JSON.parse(this.storage.get("prescription"));
    let patientId = this.storage.get("patient_id");
    this.http.get('https://e-prescription-api.herokuapp.com/patient_by_id/'+patientId).subscribe(response => {
        this.patientsResponse = response.json();
        this.patientsArray = this.patientsResponse["data"];
        this.patient = this.patientsArray[0];
      });
    //console.log(this.prescriptionObject);
  }


  goToPreviousPage()
  {
    this.router.navigate(['/doctor/view-prescription'])
  }

}
