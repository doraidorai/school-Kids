import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
user :any;
courses:any=[]; 
assignInfo:any=[];    
  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.user= JSON.parse(localStorage.getItem('connectedUser'));
    // this.courseService.getCoursesById(this.user.id).subscribe(
    //   (response) => { this.courses = response.courses }
    // );
    this.courseService.getAssignInfo().subscribe(
      (response) => { this.assignInfo = response.assignInfo }
    );
    this.courseService.getAllCourses().subscribe(
      (response) => { this.courses = response.courses }
    );
  }

}
