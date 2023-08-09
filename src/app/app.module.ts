import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatBottomSheetModule, MatButtonToggleModule, MatCardModule,
   MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule,
    MatGridListModule, MatIconModule, MatNativeDateModule, MatRadioModule,
     MatSelectModule, MatSlideToggleModule, MatTableModule, 
     MatTabsModule, MatToolbarModule } from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { AboutComponent } from './components/about/about.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ContactComponent } from './components/contact/contact.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ErrorComponent } from './components/error/error.component';
import { ThreeComponent } from './components/three/three.component';
import { TwoComponent } from './components/two/two.component';
import { OneComponent } from './components/one/one.component';
import { ZeroComponent } from './components/zero/zero.component';
import { ThanksComponent } from './components/thanks/thanks.component';
import { UpcomingCoursesComponent } from './components/upcoming-courses/upcoming-courses.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AdminSignupComponent } from './components/admin-signup/admin-signup.component';
import { HttpClientModule } from '@angular/common/http';
import { TeacherSignupV2Component } from './components/teacher-signup-v2/teacher-signup-v2.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { StudentCoursesComponent } from './components/student-courses/student-courses.component';
import { EventsComponent } from './components/events/events.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { StudentsComponent } from './components/students/students.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ReviewsComponent,
    ContactComponent,
    ScrollToTopComponent,
    AdminDashboardComponent,
    FeedbackComponent,
    ErrorComponent,
    ThreeComponent,
    TwoComponent,
    OneComponent,
    ZeroComponent,
    ThanksComponent,
    UpcomingCoursesComponent,
    CarouselComponent,
    TeachersComponent,
    CoursesComponent,
    AdminSignupComponent,
    TeacherSignupV2Component,
    ProfileComponent,
    TeacherDashboardComponent,
    StudentDashboardComponent,
    CourseFormComponent,
    StudentCoursesComponent,
    EventsComponent,
    AddEventComponent,
    StudentsComponent,
    SearchFilterPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatRadioModule,
    MatBottomSheetModule,
    HttpClientModule,
    MatSelectModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    Ng2SearchPipeModule
  ],
  entryComponents: [CourseFormComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
