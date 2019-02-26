import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; 
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cookieValue = 'UNKNOWN';

  loginDoctorResponse: any;
  loginDoctorData: any;
  loginPatientResponse: any;


  constructor(private Auth: AuthService, private router: Router,  private cookieService: CookieService ) { }

  ngOnInit() {

  }

  loginDoctor(event)
  {
    event.preventDefault()
    const target = event.target
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value

     this.Auth.getDoctor(username,password).subscribe(data=>
      {
        this.loginDoctorResponse = data;
        console.log(this.loginDoctorResponse);
        if(this.loginDoctorResponse.status==true)
        {
          this.loginDoctorData = this.loginDoctorResponse.data;
          this.cookieService.set( 'doctor_id', this.loginDoctorData.doctor_id );

        // window.alert("Welcome Doctor");
          this.Auth.setLoggedIn(true)
          this.router.navigate(['doctor'])
        }
        else
        {
          window.alert("The Credentials are not Valid.. Try Again");
          this.router.navigate(['login'])
        }
      });
  }

  login(event)
  {
    event.preventDefault()
    const target = event.target
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value

    if((!target.querySelector('#r1').checked)&&(!target.querySelector('#r2').checked))
    {
      alert("Select whether you are Doctor or Patient");
      this.router.navigate(['login']);
    }
    
    else if(target.querySelector('#r1').checked)
    {
     this.Auth.getDoctor(username,password).subscribe(data=>
      {
        this.loginDoctorResponse = data;
        console.log(this.loginDoctorResponse);
        if(this.loginDoctorResponse.status==true)
        {
          this.cookieService.set("username",this.loginDoctorResponse.data.doctor_id);
          window.alert("Welcome "+ this.cookieService.get("username"));
          this.Auth.setLoggedIn(true)
          this.router.navigate(['doctor'])
            
        }
        else
        {
          window.alert("The Credentials are not Valid.. Try Again");
          this.router.navigate(['login'])
        }
      });
    }

    else if(target.querySelector('#r2').checked)
    {
      this.Auth.getPatient(username,password).subscribe(data=>
        {
          this.loginPatientResponse = data;
          console.log(this.loginDoctorResponse);
          if(this.loginPatientResponse.status==true)
          {
            this.cookieService.set("username",this.loginPatientResponse.data.patient_id);
            window.alert("Welcome "+ this.cookieService.get("username"));
            this.Auth.setLoggedIn(true)
            this.router.navigate(['patient'])
          }
          else
          {
            window.alert("The Credentials are not Valid.. Try Again");
            this.router.navigate(['login'])
          }
        });
    }
  }

}
