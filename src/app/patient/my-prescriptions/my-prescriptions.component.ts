import { Component, OnInit, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-prescriptions',
  templateUrl: './my-prescriptions.component.html',
  styleUrls: ['./my-prescriptions.component.css']
})
export class MyPrescriptionsComponent implements OnInit {

  cookieValue = 'UNKNOWN';
  prescriptionsArray: any[] = [];
  prescriptionsFound = false;
  prescriptionsNotFound = false;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private cookieService: CookieService, private http: Http, private router: Router) { }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('username');
    this.loadAllPrescriptions();
  }

  loadAllPrescriptions()
  {
    
    this.http.get('https://e-prescription-api.herokuapp.com/patient_prescriptions/'+this.cookieValue).subscribe(response => {
        this.prescriptionsArray = response.json().data;
        if(this.prescriptionsArray!=undefined)
        {
          this.prescriptionsNotFound = false;
          this.prescriptionsFound = true;
          for(var i=0;i<this.prescriptionsArray.length;i++)
      {
        var d = new Date(this.prescriptionsArray[i].date);
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
        this.prescriptionsArray[i].date = displayDate;
      }
          for(let i=0;i<this.prescriptionsArray.length;i++)
          {
           
              this.http.get('https://e-prescription-api.herokuapp.com/doctor_by_id/'+this.prescriptionsArray[i].doctor_id).subscribe(response => {
                console.log('https://e-prescription-api.herokuapp.com/doctor_by_id/'+this.prescriptionsArray[i].doctor_id);
              let doctorResponse = response.json().data;
              let firstObj = doctorResponse[0];
              console.log(firstObj);
              let presObj = this.prescriptionsArray[i];
              presObj['doctor_name'] = firstObj.name;
              this.prescriptionsArray[i] = presObj;
              //console.log(this.prescriptionsArray[i]);
        });
          }
          this.prescriptionsArray.reverse();
        }
        else{
          this.prescriptionsNotFound = true;
          this.prescriptionsFound = false;
        }
        
      });
    
  }

  navigateToDetail(event)
{
  let pres_id = event.path[1].id;
  console.log("Prescription Id:"+pres_id);
  for(let z=0;z<this.prescriptionsArray.length;z++)
  {
    if(this.prescriptionsArray[z].prescription_id==pres_id)
    {
      this.storage.set("prescription", JSON.stringify(this.prescriptionsArray[z]));
      console.log(this.storage.get("prescription"));
      break;
    }
  }
  this.router.navigate(['/patient/view-prescription/'+pres_id])
  
 // console.log("Local storage: "+this.storage.get("prescription_id"));

}

}
