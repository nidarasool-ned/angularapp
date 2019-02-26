import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn')|| 'false')

  constructor(private http: HttpClient) 
  { 

  }

  setLoggedIn(value:boolean)
  {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true')
  }

  get isLoggedIn()
  {
    return JSON.parse(localStorage.getItem('loggedIn')|| this.loggedInStatus.toString())
  }

  getDoctor(username, password)
  {
     return this.http.post('https://e-prescription-api.herokuapp.com/login_doctor',
     {
       "email":username,
       "password":password
     });
     
  }

  
  getPatient(username, password)
  {
     return this.http.post('https://e-prescription-api.herokuapp.com/login_patient',
     {
       "email":username,
       "password":password
     });
     
  }

  newDoctor(name,age,gender,address,contact,email,city_id,password)
  {
     return this.http.post('https://e-prescription-api.herokuapp.com/add_doctor',
     {
       "name":name,
       "age":age,
       "gender":gender,
       "address":address,
       "cellphone": contact,
       "email":email,
       "city_id":city_id,
       "password":password
     });
     
  }

  newPatient(name,age,gender,address,contact,email,city_id,password)
  {
     return this.http.post('https://e-prescription-api.herokuapp.com/add_patient',
     {
       "name":name,
       "age":age,
       "gender":gender,
       "address":address,
       "cellphone": contact,
       "email":email,
       "city_id":city_id,
       "password":password
     });
     
  }
  
}
