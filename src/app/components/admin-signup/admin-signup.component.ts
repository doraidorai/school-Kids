import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent implements OnInit {
  hide = true;user:any;
  signupForm: FormGroup;
  words: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  selectedWords: string[] = [];
  isPuzzleCorrect:boolean= false;
  constructor(private x:FormBuilder, private userService: UserService, private router:Router) { }

  ngOnInit() {
    this.signupForm = this.x.group({
      firstName:['', [Validators.required]],
      lastName:['' , [Validators.required]],
      email:['' , [Validators.required , Validators.email]],
      tel:['' , [Validators.required, Validators.minLength(8)]],
      pwd:['' , [Validators.required, Validators.minLength(6) ]],
      confirmPwd:['' , [Validators.required]],
    },{ validators: this.pwdMisMatch('pwd','confirmPwd') });
    this.user = JSON.parse(localStorage.getItem('connectedUser'));
    if (this.user) {
      this.router.navigate(['/error'])
    }
  }
  handleClick(word: string) {
    this.selectedWords.push(word);

    if (this.selectedWords.join(' ') == 'A D M I N') {
      this.isPuzzleCorrect = true;
    }
  }



  signup(){
    // console.log('here is signup object FE', this.signupForm.value);

    this.signupForm.value.role='admin';

    this.userService.signup(this.signupForm.value , this.signupForm.value.img).subscribe(
      (response)=>{
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











  pwdMisMatch(ch1, ch2){
    return(formGroup:FormGroup)=>{
      const a = formGroup.controls[ch1];
      const b = formGroup.controls[ch2];
      
      if (b.errors &&  !b.errors.pwdMisMatch) {
        return
      }
      if (a.value !== b.value) {
        b.setErrors({pwdMisMatch:true})
      }else{
        b.setErrors(null)
      }
    }
  }



}
