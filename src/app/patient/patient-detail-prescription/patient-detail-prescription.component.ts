import { Component, OnInit, Inject  } from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-patient-detail-prescription',
  templateUrl: './patient-detail-prescription.component.html',
  styleUrls: ['./patient-detail-prescription.component.css']
})
export class PatientDetailPrescriptionComponent implements OnInit {

  cookieValue;
  prescriptionObject: any = {};
  patientsResponse: any;
  patientsArray: any[];
  patient: any = {};


  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router, private http: Http, private cookieService: CookieService) { }

  ngOnInit() {
    this.prescriptionObject = JSON.parse(this.storage.get("prescription"));
    this.cookieValue = this.cookieService.get('username');

    this.http.get('https://e-prescription-api.herokuapp.com/patient_by_id/'+this.cookieValue).subscribe(response => {
        this.patientsResponse = response.json();
        this.patientsArray = this.patientsResponse["data"];
        this.patient = this.patientsArray[0];
      });
  }

  goToPreviousPage()
  {
    this.router.navigate(['/patient/my-prescriptions'])
  }

}
