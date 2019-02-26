import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private cookieService: CookieService, private Auth: AuthService, private router: Router) { 
   // this.cookieService.delete("username");
    this.cookieService.deleteAll();
    this.Auth.setLoggedIn(false);
    this.router.navigate(['login'])
  }

  ngOnInit() {
  }

}
