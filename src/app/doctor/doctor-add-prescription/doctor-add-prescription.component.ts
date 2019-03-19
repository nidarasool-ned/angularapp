import { Component, OnInit,Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-add-prescription',
  templateUrl: './doctor-add-prescription.component.html',
  styleUrls: ['./doctor-add-prescription.component.css']
})
export class DoctorAddPrescriptionComponent implements OnInit {

  cookieValue = 'UNKNOWN';
  isHidden = true;
  addPatientHidden = true;
  patientsResponse: any;
  patientsArray: any[] = [];
  patient: any = {};
  apiUrl: string;
  followed: boolean = false;
  notfollowed: boolean = false;
  textButton: string = "";

  citiesResponse: any;
  citiesArray: any[];

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
      this.isHidden = true;
      this.addPatientHidden = false;
      this.followed = true;
      this.notfollowed = false;
      this.http.get('https://e-prescription-api.herokuapp.com/all_cities').subscribe(response => {
        this.citiesResponse = response.json();
        this.citiesArray = this.citiesResponse["data"];
        console.log(this.citiesArray);
      });

    }
    else{
      this.http.get('https://e-prescription-api.herokuapp.com/check_follow/'+this.patientsArray[0].patient_id+'/'+this.cookieValue).subscribe(response => {
        if(response.json().status)
        {
          this.followed = true;
          this.notfollowed = false;
          this.isHidden = false;
          this.addPatientHidden = true;
          this.patient = this.patientsArray[0];
          console.log(this.patient);
        }
        else{
          this.followed = false;
          this.notfollowed = true;
          this.isHidden = true;
          this.patient = this.patientsArray[0];
          this.addPatientHidden = true;
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


addPrescription(addpres)
{
  let newprescription = {
    "patient_id": this.patient.patient_id,
    "doctor_id": +this.cookieValue,
    "is_eprescription": 1,
    "file_format_id": 1,
    "comment": addpres.value.comments
  };
  //console.log('https://e-prescription-api.herokuapp.com/prescription_by_id/'+this.patient.patient_id+'/'+this.cookieValue);
  console.log(newprescription);
 this.http.post('https://e-prescription-api.herokuapp.com/add_prescription',newprescription)
 .subscribe(response => 
  {
    console.log(response.json());
    window.location.reload();
  });
  
}
  addPatient(patientform)
  {
    console.log(patientform);
    let newpatient = {
      "name": patientform.value.patientname,
      "gender": patientform.value.patientgender,
      "age": patientform.value.patientage,
      "email": patientform.value.patientemail,
      "cellphone": patientform.value.patientphone,
      "address": patientform.value.patientaddress,
      "city_id": +patientform.value.patientcity,
      "password": patientform.value.patientpassword,
    };

  
    // Adding the new patient
   this.http.post('https://e-prescription-api.herokuapp.com/add_patient',newpatient)
   .subscribe(response => {
     console.log(response.json());
     newpatient['patient_id'] = response.json().patient_id;
    
     this.patient = newpatient;
     let followObj = {
      "patient_id": this.patient.patient_id,
      "doctor_id": this.cookieValue,
      "accepted": 1,
    };

    //console.log(followObj);
   // Patient follows the doctor
   this.http.post('https://e-prescription-api.herokuapp.com/new_follow',followObj)
   .subscribe(response => {
     console.log(response.json());
   });
   });

    this.isHidden = false;
      this.addPatientHidden = true;

  }

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private cookieService: CookieService, private http: Http, private router: Router) { }

  ngOnInit() {
    console.log(this.storage.get("patient_id"));
    this.cookieValue = this.cookieService.get('username');
    this.storage.set("patient_id",0);
    console.log(this.storage.get("patient_id"));
  }

  changeFollowStatus()
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
