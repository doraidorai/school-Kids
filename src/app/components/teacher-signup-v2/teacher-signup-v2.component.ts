import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-signup-v2',
  templateUrl: './teacher-signup-v2.component.html',
  styleUrls: ['./teacher-signup-v2.component.css']
})
export class TeacherSignupV2Component implements OnInit {
  hide = true;user:any;
  signupTeacherForm: FormGroup;
  imagePreview: string;
  selectedImage: File;imageUrl: string;
  selectedCV: File;
  constructor(private x: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.signupTeacherForm = this.x.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.minLength(8)]],
      pwd: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required]],
      speciality: ['', [Validators.required]],
      cv: [""],
      img: [""],
    });
    this.user = JSON.parse(localStorage.getItem('connectedUser'));
    if (this.user) {
      this.router.navigate(['/error'])
    }
  }
  signupTeacher() {
    const formData = new FormData();
    formData.append('firstName', this.signupTeacherForm.value.firstName);
    formData.append('lastName', this.signupTeacherForm.value.lastName);
    formData.append('email', this.signupTeacherForm.value.email);
    formData.append('tel', this.signupTeacherForm.value.tel);
    formData.append('pwd', this.signupTeacherForm.value.pwd);
    formData.append('address', this.signupTeacherForm.value.address);
    formData.append('speciality', this.signupTeacherForm.value.speciality);
    formData.append('img', this.selectedImage);
    formData.append('cv', this.selectedCV);
    formData.append('role', 'teacher');
    formData.append('status', 'notOk');


    this.userService.signupTeacher(formData).subscribe(
      (response) => {
        console.log('here response from BE', response);
        if (response.msg == '1') {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: "Your phone number shoud be not pre-registered.",
          })
        }else if (response.msg == 'true') {
          let timerInterval: any;
          Swal.fire({
            title: 'Registration is in progress!',
            html: 'I will close in <b></b> milliseconds.',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const b = Swal.getHtmlContainer().querySelector('b');
              timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft().toString();
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer');
              this.router.navigate(['/home'])
            }
          });   
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: "Oops, something went wrong!",
          })
        }
      }
    );
  }
  handleImageUpload(event: any) {
    this.selectedImage = event.target.files[0];
    this.getImageUrl();
  }
  getImageUrl() {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.selectedImage);
  }
  handleCVUpload(event: any) {
    this.selectedCV = event.target.files[0];
  }

}
