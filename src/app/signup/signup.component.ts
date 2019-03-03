import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerDoctorResponse: any;
  registerPatientResponse: any;

  constructor(private Auth: AuthService, private router: Router, private cookie:CookieService) { }

  ngOnInit() {
  }

  registerDoctor(event)
  {
    event.preventDefault()
    const target = event.target
    const name = target.querySelector('#name').value
    const age = target.querySelector('#age').value
    const gender = target.querySelector('#gender').value
    const address = target.querySelector('#address').value
    const contact = target.querySelector('#contact').value
    const email = target.querySelector('#email').value
    const city_id = target.querySelector('#city').value
    const password = target.querySelector('#password').value
    

    if((!target.querySelector('#r1').checked)&&(!target.querySelector('#r2').checked))
    {
      alert("Select whether you are Doctor or Patient");
      this.router.navigate(['login']);
    }
    
    else if(target.querySelector('#r1').checked)
    {
      this.Auth.newDoctor(name,age,gender,address,contact,email,city_id,password).subscribe(data=>
        {
          this.registerDoctorResponse = data;
          console.log(this.registerDoctorResponse);
          if(this.registerDoctorResponse.status==true)
          {
            console.log("Hello Doctor!!");
            this.cookie.set("username",this.registerDoctorResponse.doctor_id);
            this.router.navigate(['doctor'])
  
          }
        });
    }

    else if(target.querySelector('#r2').checked)
    {
      this.Auth.newPatient(name,age,gender,address,contact,email,city_id,password).subscribe(data=>
        {
          this.registerDoctorResponse = data;
          console.log(this.registerDoctorResponse);
          if(this.registerDoctorResponse.status==true)
          {
            console.log("Hello Patient!!");
            this.cookie.set("username",this.registerDoctorResponse.patient_id);
            this.router.navigate(['patient'])
  
          }
        });
    }
  }

}
