import { BrowserModule } from '@angular/platform-browser';
import {Route, RouterModule} from '@angular/router'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {StorageServiceModule} from 'angular-webstorage-service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard'; 
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { DoctorAddPrescriptionComponent } from './doctor/doctor-add-prescription/doctor-add-prescription.component';
import { DoctorViewPrescriptionComponent } from './doctor/doctor-view-prescription/doctor-view-prescription.component';
import { DoctorViewProfileComponent } from './doctor/doctor-view-profile/doctor-view-profile.component';
import { DoctorHomeComponent } from './doctor/doctor-home/doctor-home.component';
import { DoctorMainScreenComponent } from './doctor/doctor-main-screen/doctor-main-screen.component';
import { DoctorSidebarComponent } from './doctor/doctor-sidebar/doctor-sidebar.component';
import {DoctorDetailPrescriptionComponent } from './doctor/doctor-detail-prescription/doctor-detail-prescription.component'
import { CookieService } from 'ngx-cookie-service';
import { PatientMainScreenComponent } from './patient/patient-main-screen/patient-main-screen.component';
import { PatientSidebarComponent } from './patient/patient-sidebar/patient-sidebar.component';
import { PatientHomeComponent } from './patient/patient-home/patient-home.component';
import { PatientProfileComponent } from './patient/patient-profile/patient-profile.component';
import { MyDoctorsComponent } from './patient/my-doctors/my-doctors.component';
import { MyPrescriptionsComponent } from './patient/my-prescriptions/my-prescriptions.component';
import { MyReportsComponent } from './patient/my-reports/my-reports.component';
import { PatientDetailPrescriptionComponent } from './patient/patient-detail-prescription/patient-detail-prescription.component';

const routes : Route[] = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { 
    path: 'doctor', 
    component: DoctorMainScreenComponent,
    children: [
      { path: 'home', component: DoctorHomeComponent},
      { path: 'add-prescription', component: DoctorAddPrescriptionComponent},
      { path: 'view-prescription', component: DoctorViewPrescriptionComponent},
      { path: 'view-prescription/:pres_id', component: DoctorDetailPrescriptionComponent},
      { path: 'view-profile', component: DoctorViewProfileComponent},
      { path: 'logout', component: LogoutComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full'}
    ]},
    { 
      path: 'patient', 
      component: PatientMainScreenComponent,
      children: [
        { path: 'search-doctor', component: PatientHomeComponent},
        { path: 'my-doctors', component: MyDoctorsComponent},
        { path: 'my-prescriptions', component: MyPrescriptionsComponent},
        { path: 'view-prescription/:pres_id', component: PatientDetailPrescriptionComponent},
        { path: 'my-reports', component: MyReportsComponent},
        { path: 'view-profile', component: PatientProfileComponent},
        { path: 'logout', component: LogoutComponent},
        { path: '', redirectTo: 'search-doctor', pathMatch: 'full'}
      ]},

  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    SignupComponent,
    DoctorAddPrescriptionComponent,
    DoctorViewPrescriptionComponent,
    DoctorViewProfileComponent,
    DoctorHomeComponent,
    DoctorMainScreenComponent,
    DoctorSidebarComponent,
    DoctorDetailPrescriptionComponent,
    PatientMainScreenComponent,
    PatientSidebarComponent,
    PatientHomeComponent,
    PatientProfileComponent,
    MyDoctorsComponent,
    MyPrescriptionsComponent,
    MyReportsComponent,
    PatientDetailPrescriptionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    StorageServiceModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AppComponent, AuthService, AuthGuard, CookieService, LoginComponent, SignupComponent, DoctorAddPrescriptionComponent, DoctorViewPrescriptionComponent, PatientHomeComponent, PatientProfileComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
