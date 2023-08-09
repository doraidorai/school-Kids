import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students=[];
  assignInfo=[];
  courses=[];
  searchText:any;
  constructor(private userService: UserService,private courseService: CourseService, private router: Router) { }

  ngOnInit():void {
    this.userService.getAllStudents().subscribe(
      (response) => { this.students = response.students }
    );
    this.courseService.getAssignInfo().subscribe(
      (response) => { this.assignInfo = response.assignInfo }
    );
    this.courseService.getAllCourses().subscribe(
      (response) => { this.courses = response.courses }
    );
  }

}
