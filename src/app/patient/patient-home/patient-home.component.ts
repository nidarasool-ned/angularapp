import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { flushModuleScopingQueueAsMuchAsPossible } from '@angular/core/src/render3/jit/module';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.css']
})
export class PatientHomeComponent implements OnInit {

  cookieValue = 'UNKNOWN';
  doctorsResponse: any;
  doctorsArray: any[] = [];
  doctorsFound: boolean = false;
  doctorsNotFound: boolean = false;
  followingStatus: string[] = [];

  constructor(private cookieService: CookieService, private http: Http) { }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('username');
  }

  searchDoctor()
  {
    this.doctorsArray = [];
    let searchChoice: number = document.forms["searchDoctorForm"]["searchChoice"].value;
    let searchInput: string = document.forms["searchDoctorForm"]["userinput"].value;
   // console.log(searchChoice);
   // console.log(searchInput);
    if(searchChoice==1)
    {
      this.http.get('https://e-prescription-api.herokuapp.com/doctor_by_name/'+searchInput).subscribe(response => {
        this.doctorsResponse = response.json();
        this.doctorsArray = this.doctorsResponse["data"];
        this.getFollowingStatus();
      });
     //console.log(searchChoice);
    }
    else if(searchChoice==2)
    {
      this.http.get('https://e-prescription-api.herokuapp.com/doctor_by_contact/'+searchInput).subscribe(response => {
        this.doctorsResponse = response.json();
        this.doctorsArray = this.doctorsResponse["data"];
        this.getFollowingStatus();
      });
    }
    
  }


  displayBlocks()
  {
    if(this.doctorsArray==undefined)
      {
         this.doctorsNotFound = true;
         this.doctorsFound = false;
      }
      else{
        this.doctorsNotFound = false;
        this.doctorsFound = true;
      }
  }

  getFollowingStatus()
  {
    for(let i=0;i<this.doctorsArray.length;i++)
    {
      let doctor = this.doctorsArray[i];
      this.http.get('https://e-prescription-api.herokuapp.com/check_follow/'+this.cookieValue+'/'+doctor.doctor_id).subscribe(response => 
      {
        if(response.json().status)
        {
          doctor['follow_status'] = 'Unfollow';
          this.doctorsArray[i] = doctor;
          
        }
        else if(response.json().message=='not followed')
        {
          doctor['follow_status'] = 'Follow';
          this.doctorsArray[i] = doctor;
        }
        else{
          doctor['follow_status'] = 'Accept Request';
          this.doctorsArray[i] = doctor;
        }
      });
    }
    this.displayBlocks();
  }

  changeFollowStatus(event)
  {
    let doctor_id = event.path[0].id;
    console.log(event);
    let buttonText = event.path[0].textContent;
    console.log(buttonText);
    if(buttonText=='Follow')
    {
      let followObj = {
        "patient_id": this.cookieValue,
        "doctor_id": doctor_id,
        "accepted": 1,
      };

      this.http.post('https://e-prescription-api.herokuapp.com/new_follow',followObj).subscribe(response => {
        this.searchDoctor();
    });
    }
    else if(buttonText=='Unfollow')
    {
      this.http.get('https://e-prescription-api.herokuapp.com/update_follow/'+this.cookieValue+'/'+doctor_id).subscribe(response => {
        event.path[0].textContent = 'Follow';
        this.searchDoctor();
    });
    }
    else if(buttonText=='Accept Request')
    {
      this.http.get('https://e-prescription-api.herokuapp.com/update_follow/'+this.cookieValue+'/'+doctor_id).subscribe(response => {
        event.path[0].textContent = 'Unfollow';
        this.searchDoctor();
    });
    }
  
  }

}
