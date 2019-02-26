import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  cookieValue = 'UNKNOWN';
  patientsResponse: any;
  patientsArray: any[];
  patient: any = {};

  constructor(private cookieService: CookieService, private http: Http) { }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('username');
    this.getPatientData();
  }

  getPatientData()
  {
    this.http.get('https://e-prescription-api.herokuapp.com/patient_by_id/'+this.cookieValue).subscribe(response => {
      this.patientsResponse = response.json();
      this.patientsArray = this.patientsResponse["data"];
      this.patient = this.patientsArray[0];
    });
  }

}
