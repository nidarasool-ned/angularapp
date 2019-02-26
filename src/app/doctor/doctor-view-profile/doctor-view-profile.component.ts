import { Component, OnInit, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Http, Response } from '@angular/http';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-doctor-view-profile',
  templateUrl: './doctor-view-profile.component.html',
  styleUrls: ['./doctor-view-profile.component.css']
})
export class DoctorViewProfileComponent implements OnInit {

  cookieValue = 'UNKNOWN';
  doctorsResponse: any;
  doctorsArray: any[];
  doctor: any = {};

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private cookieService: CookieService, private http: Http ) {
   
   }

  ngOnInit() {
    console.log(this.storage.get("patient_id"));
    this.cookieValue = this.cookieService.get('username');
    this.storage.set("patient_id",0);
    console.log(this.storage.get("patient_id"));
    //console.log(this.cookieValue);
    this.getDoctorData();
  }

  getDoctorData()
  {
    this.http.get('https://e-prescription-api.herokuapp.com/doctor_by_id/'+this.cookieValue).subscribe(response => {
      this.doctorsResponse = response.json();
      this.doctorsArray = this.doctorsResponse["data"];
      this.doctor = this.doctorsArray[0];
    });
  }

}
