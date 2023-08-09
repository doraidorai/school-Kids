import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  actualDate:any;
  teachers: any = [];
  students:any = [];
  parents:any = [];
  user: any;
  courses: any = [];
  selectedStudentsId: any = [];
  assignInfo:any=[];
  constructor(private router: Router, private userService: UserService, private courseService: CourseService) { }

  ngOnInit() {
    const imageContainers = document.querySelectorAll('.image-container') as NodeListOf<HTMLElement>;
    imageContainers.forEach((container) => {
      container.addEventListener('wheel', (event: WheelEvent) => {
        event.preventDefault();
        container.scrollLeft += event.deltaY;
      });
    });
    setInterval(() => {
      this.updateDate();
    }, 1000); 
    this.user = JSON.parse(localStorage.getItem('connectedUser'));
    if (!this.user || this.user.role !== 'admin') {
      this.router.navigate(['/error'])
    }
    this.userService.getAllTeachers().subscribe(
      (response) => { this.teachers = response.teachers }
    );
    this.userService.getAllStudents().subscribe(
      (response) => { this.students = response.students }
    );
    this.userService.getAllParents().subscribe(
      (response) => { this.parents = response.parents }
    );
    this.courseService.getAllCourses().subscribe(
      (response) => { this.courses = response.courses }
    );
    this.courseService.getAssignInfo().subscribe(
      (response) => { this.assignInfo = response.assignInfo }
    );
  }
  updateDate() {
    this.actualDate = new Date();
  }

  statusColor(x) {
    if (x == 'notOk') {
      return 'red'
    } else {
      return 'green'
    }
  }
  acceptTeacher(teacherObj: any) {
    teacherObj.status = 'ok';
    this.userService.acceptTeacher(teacherObj).subscribe(
      (response)=>{
        if (response.msg == true) {
          Swal.fire({
            icon: 'success',
            title: 'Confirm successfully',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: "Oops, something went wrong!",
          })
        }
      }
    );
  }

  
  deleteTeacher(id){    
    this.userService.deleteTeacher(id).subscribe(
      (response) => {
        if (response.msg == true) {
          Swal.fire({
            icon: 'success',
            title: 'Delete successfully',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.userService.getAllTeachers().subscribe(
              (response) => { this.teachers = response.teachers }
            );
          });
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: "Oops, something went wrong!",
          })
        }
      }
    )
  }
  deleteStudent(id){    
    this.userService.deleteStudent(id).subscribe(
      (response) => {
        if (response.msg == true) {
          Swal.fire({
            icon: 'success',
            title: 'Delete successfully',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.userService.getAllStudents().subscribe(
              (response) => { this.students = response.students }
            );
          });
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: "Oops, something went wrong!",
          })
        }
      }
    )
  }
  deleteParent(id){    
    this.userService.deleteParent(id).subscribe(
      (response) => {
        if (response.msg == true) {
          Swal.fire({
            icon: 'success',
            title: 'Delete successfully',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.userService.getAllParents().subscribe(
              (response) => { this.parents = response.parents }
            );
          });
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: "Oops, something went wrong!",
          })
        }
      }
    )
  }
  applySelectedStudents(id){
    let assignInfo = {
      courseId: id,
      studentsId: this.selectedStudentsId,
    };
    this.courseService.saveAssignInfo(assignInfo).subscribe(
      (response)=>{
        if (response.msg == true) {
          Swal.fire({
            icon: 'success',
            title: 'Assign Completed',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.courseService.getAssignInfo().subscribe(
              (response) => { this.assignInfo = response.assignInfo }
            );
          });
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: "Oops, something went wrong!",
          })
        }
      }
    );
  }
}
