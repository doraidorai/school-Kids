import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  user: any;
  imagePreview: string;
  eventForm: FormGroup;
  constructor(private router: Router, private x: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('connectedUser'));
    if (!this.user || this.user.role !== 'admin') {
      this.router.navigate(['/error'])
    };
    this.eventForm = this.x.group({
      title: [''],
      subtitle: [''],
      country: [''],
      date: [''],
      img: [""]
    })
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.eventForm.patchValue({ img: file });
    this.eventForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string 
    };
    reader.readAsDataURL(file);
  }
  eventSave() {
    this.userService.eventSave(this.eventForm.value, this.eventForm.value.img).subscribe(
      (response) => {

        console.log('here response from BE', response);
        if (response.msg == true) {
          let timerInterval: any;
          Swal.fire({
            title: 'Saving in progress!',
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
              this.router.navigate(['/admin-dashboard'])
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
  }

}
