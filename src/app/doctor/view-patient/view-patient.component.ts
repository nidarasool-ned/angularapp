import { Component, OnInit, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
export class ViewPatientComponent implements OnInit {

  patientId: number;
  cookieValue = 'UNKNOWN';
  noPrescriptions = false;
  prescriptionsFound = false;
  patientsResponse: any;
  patientsArray: any[];
  presResponse: any;
  presArray: any[];
  patient: any = {};

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private cookieService: CookieService, private http: Http, private router: Router) { }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('username');
    this.patientId = this.storage.get("id_of_patient");
    console.log(this.patientId);
    this.loadPatientData();
  }

  loadPatientData()
  {
    this.http.get('https://e-prescription-api.herokuapp.com/patient_by_id/'+this.patientId).subscribe(response => {
        this.patientsResponse = response.json();
        this.patientsArray = this.patientsResponse["data"];
        this.patient = this.patientsArray[0];
      });
      this.loadPrescriptions();
  }
  
  loadPrescriptions()
{
  this.http.get('https://e-prescription-api.herokuapp.com/prescription_by_id/'+this.patientId+'/'+this.cookieValue).subscribe(response => {
    this.presResponse = response.json();
    let temp: boolean = response.json().status;
    this.presArray = this.presResponse["data"];
    if(!temp)
    {
      this.noPrescriptions = true;
      this.prescriptionsFound = false;

    }
    else{
      
      for(var i=0;i<this.presArray.length;i++)
      {
        var d = new Date(this.presArray[i].date);
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        var displayDate = d.getDate()+" "+month[d.getMonth()]+" "+d.getFullYear();
        this.presArray[i].date = displayDate;
      }
      this.noPrescriptions = false;
        this.prescriptionsFound = true;
      this.presArray = this.presArray.reverse();

    }
    
   // console.log(this.presArray);
  });
}

navigateToDetail(event)
{
  let pres_id = event.path[1].id;
  console.log("Prescription Id:"+pres_id);
  for(let z=0;z<this.presArray.length;z++)
  {
    if(this.presArray[z].prescription_id==pres_id)
    {
      this.storage.set("prescription", JSON.stringify(this.presArray[z]));
      console.log(this.storage.get("prescription"));
      break;
    }
  }
  this.router.navigate(['/doctor/view-patient-prescription/'+pres_id])
  
 // console.log("Local storage: "+this.storage.get("prescription_id"));

}

}
