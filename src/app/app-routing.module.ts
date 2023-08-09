import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { ThreeComponent } from './components/three/three.component';
import { TwoComponent } from './components/two/two.component';
import { OneComponent } from './components/one/one.component';
import { ZeroComponent } from './components/zero/zero.component';
import { ThanksComponent } from './components/thanks/thanks.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AdminSignupComponent } from './components/admin-signup/admin-signup.component';
import { AboutComponent } from './components/about/about.component';
import { TeacherSignupV2Component } from './components/teacher-signup-v2/teacher-signup-v2.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { StudentsComponent } from './components/students/students.component';


const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'admin-dashboard',component:AdminDashboardComponent},
  {path:'contact',component:ContactComponent},
  {path:'about',component:AboutComponent},
  {path:'error', component:ErrorComponent},
  {path:'',component:ThreeComponent},
  {path:'two', component:TwoComponent},
  {path:'one',component:OneComponent},
  {path:'zero',component:ZeroComponent},
  {path:'thanks',component:ThanksComponent},
  {path:'courses', component:CoursesComponent},
  {path:'admin-signup',component:AdminSignupComponent},
  {path:'teacher-signup-v2',component:TeacherSignupV2Component},
  {path:'profile',component:ProfileComponent},
  {path:'teacher-dashboard', component:TeacherDashboardComponent},
  {path:'student-dashboard', component:StudentDashboardComponent},
  {path:'add-event', component: AddEventComponent},
  {path:'students',component:StudentsComponent},
  { path: '**', redirectTo: '/error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
