import { Component, OnInit, Inject } from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent implements OnInit {

  cookieValue = 'UNKNOWN';
  patientsIdArray: any[] = [];
  patientsArray: any[] = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private cookieService: CookieService, private http: Http) { }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('username');
    this.storage.set("patient_id",0);
    console.log(this.storage.get("patient_id"));
    this.loadAllPatients();
  }

  loadAllPatients()
  {
    this.http.get('https://e-prescription-api.herokuapp.com/doctor_followers/'+this.cookieValue).subscribe(response => {
        this.patientsIdArray = response.json().patients;
        console.log(this.patientsIdArray);
        if(this.patientsIdArray!=undefined)
        {
          for(let i=0;i<this.patientsIdArray.length;i++)
          {
            if(this.patientsIdArray[i]!=null)
            {
              this.http.get('https://e-prescription-api.herokuapp.com/patient_by_id/'+this.patientsIdArray[i]).subscribe(response => {
              let patientResponse = response.json();
              console.log(response.json());
              this.patientsArray.push(patientResponse.data[0]);
        });
            }
          }
        }
        
      });
      console.log(this.patientsArray);
  }

  changeFollowStatus(event)
  {
    let patient_id = event.path[0].id;
    console.log('https://e-prescription-api.herokuapp.com/update_follow/'+patient_id+'/'+this.cookieValue);
    this.http.get('https://e-prescription-api.herokuapp.com/update_follow/'+patient_id+'/'+this.cookieValue).subscribe(response => {
      window.location.reload();
    });

  
  
  }

}
