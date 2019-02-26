import { Component, OnInit, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { BoundPlayerFactory } from '@angular/core/src/render3/styling/player_factory';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-view-prescription',
  templateUrl: './doctor-view-prescription.component.html',
  styleUrls: ['./doctor-view-prescription.component.css']
})
export class DoctorViewPrescriptionComponent implements OnInit {

  cookieValue = 'UNKNOWN';
  notFoundError = false;
  prescriptionsView = false;
  noPrescriptions = false;
  prescriptionsFound = false;
  addPatientHidden = true;
  patientsResponse: any;
  patientsArray: any[];
  presResponse: any;
  presArray: any[];
  patient: any = {};

  followed: boolean = false;
  notfollowed: boolean = false;
  textButton: string = "";

  searchPatient()
  {
    
    let searchChoice: number = document.forms["searchPatientForm"]["searchChoice"].value;
    let searchInput: string = document.forms["searchPatientForm"]["userinput"].value;
    console.log(searchChoice);
    console.log(searchInput);
    if(searchChoice==1)
    {
      this.http.get('https://e-prescription-api.herokuapp.com/patient_by_id/'+searchInput).subscribe(response => {
        this.patientsResponse = response.json();
        this.patientsArray = this.patientsResponse["data"];
        this.displayBlocks();
      });
     //console.log(searchChoice);
    }
    else if(searchChoice==2)
    {
      this.http.get('https://e-prescription-api.herokuapp.com/patient_by_name/'+searchInput).subscribe(response => {
        this.patientsResponse = response.json();
        this.patientsArray = this.patientsResponse["data"];
        this.displayBlocks();
      });
    }
    else if(searchChoice==3)
    {
      this.http.get('https://e-prescription-api.herokuapp.com/patient_by_contact/'+searchInput).subscribe(response => {
        this.patientsResponse = response.json();
        this.patientsArray = this.patientsResponse["data"];
        this.displayBlocks();
      });
    }
    
  }


  displayBlocks()
{
  if(this.patientsArray==undefined)
    {
       this.notFoundError = true;
       this.prescriptionsView = false;
    }
    else{
      this.http.get('https://e-prescription-api.herokuapp.com/check_follow/'+this.patientsArray[0].patient_id+'/'+this.cookieValue).subscribe(response => {
        if(response.json().status)
        {
          this.followed = true;
          this.notfollowed = false;
          this.prescriptionsView = true;
          this.notFoundError = false;
          this.patient = this.patientsArray[0];
          this.loadPrescriptions();
          //console.log(this.patient);
        }
        else{
          this.followed = false;
          this.notfollowed = true;
          this.notFoundError = false;
          this.prescriptionsView = false;
          this.patient = this.patientsArray[0];
          if(response.json().message=="not followed")
          {
            this.textButton = "Follow";
          }
          else{
            this.textButton = "Request Sent";
          }
         
          
        }
      });
      
      
    }
}

loadPrescriptions()
{
  this.http.get('https://e-prescription-api.herokuapp.com/prescription_by_id/'+this.patient.patient_id+'/'+this.cookieValue).subscribe(response => {
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
  this.storage.set("patient_id",this.patient.patient_id);
  console.log(this.patient);
  console.log(this.storage.get("patient_id"));
  this.router.navigate(['/doctor/view-prescription/'+pres_id])
  
 // console.log("Local storage: "+this.storage.get("prescription_id"));

}


  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private cookieService: CookieService, private http: Http, private router: Router) { }
  
  ngOnInit() {
    console.log(this.storage.get("patient_id"));
    this.cookieValue = this.cookieService.get('username');
    if(this.storage.get("patient_id")!=0)
    {
      console.log('https://e-prescription-api.herokuapp.com/patient_by_id/'+this.storage.get("patient_id"));
      this.http.get('https://e-prescription-api.herokuapp.com/patient_by_id/'+this.storage.get("patient_id")).subscribe(response => {
        this.patientsResponse = response.json();
        this.patientsArray = this.patientsResponse["data"];
        this.displayBlocks();
      });
    }
    console.log(this.storage.get("patient_id"));
  }

  changeFollowStatus(event)
  {
    let patient_id = this.patient.patient_id;
  
    if(this.textButton=="Follow")
    {
      this.textButton = "Request Sent";
      let followObj = {
        "patient_id": this.patient.patient_id,
        "doctor_id": this.cookieValue,
        "accepted": 0,
      };

      console.log(followObj);

      // Patient follows the doctor
   this.http.post('https://e-prescription-api.herokuapp.com/new_follow',followObj)
   .subscribe(response => {
     console.log(response.json());
   });
  
      

    }
    else if(this.textButton=="Request Sent"){
      this.http.get('https://e-prescription-api.herokuapp.com/update_follow/'+patient_id+'/'+this.cookieValue).subscribe(response => {
      
    });
    this.http.get('https://e-prescription-api.herokuapp.com/update_follow/'+patient_id+'/'+this.cookieValue).subscribe(response => {
      
    });
    this.textButton = "Follow";
    }

  
  
  }

}
