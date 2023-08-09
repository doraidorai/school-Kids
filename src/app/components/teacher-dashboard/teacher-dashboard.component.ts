import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { CourseFormComponent } from '../course-form/course-form.component';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  actualDate: any;
  imagePreview: string;
  courseEditForm: FormGroup;
  user: any;
  students: any = [];
  courses: any = [];
  notes: any = [];
  studentNoteForm: FormGroup;
  isImageSelected = false;
  assignInfo:any=[];
  constructor(private x: FormBuilder, private router: Router, private userService: UserService, private courseService: CourseService, public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(CourseFormComponent, { data: this.user });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      if (result) {
        this.courseService.courseSave(result).subscribe(
          (response) => {
            console.log('response from be', response.msg)
            if (response.msg == true) {
              Swal.fire({
                icon: 'success',
                title: 'Added successfully',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.courseService.getCoursesById(this.user.id).subscribe(
                  (response) => { this.courses = response.courses }
                );
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: "Oops, something went wrong!",
              })
            }
          }
        )
      }
    });
  }

  ngOnInit() {
    const imageContainers = document.querySelectorAll('.image-container') as NodeListOf<HTMLElement>;
    imageContainers.forEach((container) => {
      container.addEventListener('wheel', (event: WheelEvent) => {
        event.preventDefault();
        container.scrollLeft += event.deltaY;
      });
    });
    this.user = JSON.parse(localStorage.getItem('connectedUser'));
    if (!this.user || this.user.role !== 'teacher') {
      this.router.navigate(['/error'])
    }
    this.userService.getAllStudents().subscribe(
      (response) => { this.students = response.students }
    );
    this.courseService.getCoursesById(this.user.id).subscribe(
      (response) => { this.courses = response.courses }
    );
    this.userService.getAllNotes().subscribe(
      (response) => { this.notes = response.notes }
    );
    this.courseService.getAssignInfo().subscribe(
      (response) => { this.assignInfo = response.assignInfo }
    );
    setInterval(() => {
      this.updateDate();
    }, 1000);
    this.studentNoteForm = this.x.group({
      // studentId : [''],
      courseId : [''],
      note: [''],
      rating: [''],
    });
    this.courseEditForm = this.x.group({
      id: [''],
      name: [''],
      duration: [''],
      description: [''],
      img: [""],
    });
  }
  editCourse(){
    this.courseService.courseUpdate(this.courseEditForm.value, this.courseEditForm.value.img).subscribe(
      (response) => {
        console.log('here response from BE', response);
        if (response.msg == true) {
          Swal.fire({
            icon: 'success',
            title: 'Updated successfully',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.courseService.getCoursesById(this.user.id).subscribe(
              (response) => { this.courses = response.courses }
            ); 
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: "Oops, something went wrong!",
          })
        }
      }
    )
  }

  saveStudentNote(id) {
    this.studentNoteForm.value.studentId = id;
    this.userService.saveStudentNote(this.studentNoteForm.value).subscribe(
      (response) => {
        if (response.msg == true) {
          Swal.fire({
            icon: 'success',
            title: 'Added successfully',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.userService.getAllNotes().subscribe(
              (response) => { this.notes = response.notes }
            );
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: "Oops, something went wrong!",
          })
        }
      }
    )
  };
  updateDate() {
    this.actualDate = new Date();
  }
  onImageSelected(event: any) {
    const file = event.target.files[0];
    this.courseEditForm.patchValue({ img: file });
    this.courseEditForm.get('img').updateValueAndValidity();
    this.isImageSelected = true;

    // Image preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  deleteCourse(id){    
    this.courseService.deleteCourse(id).subscribe(
      (response) => {
        if (response.msg == true) {
          Swal.fire({
            icon: 'success',
            title: 'Delete successfully',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {         
            this.courseService.getCoursesById(this.user.id).subscribe(
              (response) => { this.courses = response.courses }
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
  noteColor(x) {
    if (x <= 9) {
      return 'red'
    } else if( x == 10){
      return 'orange'
    }else{
      return 'green'
    }
  }
}
