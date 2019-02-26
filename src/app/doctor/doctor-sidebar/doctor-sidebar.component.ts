import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doctor-sidebar',
  templateUrl: './doctor-sidebar.component.html',
  styleUrls: ['./doctor-sidebar.component.css']
})
export class DoctorSidebarComponent implements OnInit {

  link1 = "Home";
  link2 = "Add Prescription";
  link3 = "View Patient Prescription";
  link4 = "View Profile";
  link5 = "Logout";
  
  constructor() { }

  ngOnInit() {
  }

}
