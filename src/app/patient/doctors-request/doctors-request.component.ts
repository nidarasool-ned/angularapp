import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'appdoctors-request',
  templateUrl: './doctors-request.component.html',
  styleUrls: ['./doctors-request.component.css']
})
export class DoctorsRequestComponent implements OnInit {

  cookieValue = 'UNKNOWN';
  doctorsIdArray: any[] = [];
  doctorsArray: any[] = [];
  doctorsNotFound: boolean = false;
  doctorsFound: boolean = false;

  constructor(private cookieService: CookieService, private http: Http) { }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('username');
    this.loadAllDoctors();
  }

  loadAllDoctors()
  {
    console.log(this.cookieValue);
    this.http.get('https://e-prescription-api.herokuapp.com/patient_follow_requests/'+this.cookieValue).subscribe(response => {
        this.doctorsIdArray = response.json().requests;
        console.log(this.doctorsIdArray);
        if(this.doctorsIdArray!=undefined)
        {
          for(let i=0;i<this.doctorsIdArray.length;i++)
          {
            if(this.doctorsIdArray[i]!=null)
            {
              this.http.get('https://e-prescription-api.herokuapp.com/doctor_by_id/'+this.doctorsIdArray[i]).subscribe(response => {
              let doctorResponse = response.json();
              console.log(response.json());
              this.doctorsArray.push(doctorResponse.data[0]);
        });
            }
          }
          this.doctorsNotFound = false;
          this.doctorsFound = true;
        }
        else{
          this.doctorsNotFound= true;
          this.doctorsFound= false;
        }
        
      });
      console.log(this.doctorsArray);
  }

  acceptRequest(event)
  {
    let doctor_id=event.path[0].id;
    this.http.get('https://e-prescription-api.herokuapp.com/update_follow/'+this.cookieValue+'/'+doctor_id).subscribe(response => {
      this.loadAllDoctors();
    });
  }

}
