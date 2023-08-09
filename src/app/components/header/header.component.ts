import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('audioPlayer', { static: false }) audioPlayer!: ElementRef;
  hide = true;
  user: any;
  loginForm: FormGroup;
  signupStudentForm: FormGroup;
  signupParentForm: FormGroup;
  imagePreview: string;
  constructor(private x: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.signupStudentForm = this.x.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.minLength(8)]],
      pwd: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required]],
      img: [""],
    });
    this.signupParentForm = this.x.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.minLength(8)]],
      telSon: ['', [Validators.required]],
      pwd: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required]],
    });
    this.loginForm = this.x.group({
      tel: ['', [Validators.required]],
      pwd: ['', [Validators.required]],
    });
    this.user = JSON.parse(localStorage.getItem('connectedUser'));
  }

  signupStudent() {

    this.signupStudentForm.value.role = 'student';

    this.userService.signup(this.signupStudentForm.value, this.signupStudentForm.value.img).subscribe(
      (response) => {
        console.log('here response from BE', response);

        if (response.msg == '1') {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: "Your phone number shoud be not pre-registered.",
          })
        } else if (response.msg == 'true') {
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
              this.router.navigate(['/home']).then(() => {
                location.reload();
              });
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
    )
  };
  signupParent() {

    this.signupParentForm.value.role = 'parent';

    this.userService.signup(this.signupParentForm.value, this.signupParentForm.value.img).subscribe(
      (response) => {
        console.log('here response from BE', response);

        if (response.msg == '1') {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: "Your phone number shoud be not pre-registered.",
          })
        } else if (response.msg == 'telSonMisMatch') {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: "Your son\'s phone must be pre-registered.",
          })
        } else if ((response.msg == 'true')) {
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
              this.router.navigate(['/home']).then(() => {
                location.reload();
              });
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

  login() {

    this.userService.login(this.loginForm.value).subscribe(
      (response) => {

        if (response.msg == 'decline') {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: "Ckeck your Phone number or password!",
          })
        } else if (response.msg == 'declineStatus') {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: "Your account has not been accepted yet!",
          })
        } else {
          localStorage.setItem('connectedUser', JSON.stringify(response.connectedUser));
          if (response.connectedUser.role == 'admin') {
            this.router.navigate(['/admin-dashboard']).then(() => {
              location.reload();
            });
          } else if (response.connectedUser.role == 'teacher') {
            this.router.navigate(['/teacher-dashboard']).then(() => {
              location.reload();
            });
          } else if (response.connectedUser.role == 'student') {
            this.router.navigate(['/student-dashboard']).then(() => {
              location.reload();
            });
          } else {
            this.router.navigate(['/home']).then(() => {
              location.reload();
            });
          }
        }
      }
    );
  }
  logout() {
    localStorage.removeItem('connectedUser');
    this.router.navigate(['/home']).then(() => {
      location.reload();
    });
  }




  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupStudentForm.patchValue({ img: file });
    this.signupStudentForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }





  playMusic() {
    this.audioPlayer.nativeElement.play();
  }
  switchModalBody(): void {
    $('#modalBody1').toggle();
    $('#modalBody2').toggle();
  }


}