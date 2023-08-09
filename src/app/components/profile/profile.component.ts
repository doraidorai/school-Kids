import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;
  profileForm: FormGroup;
  imagePreview: string;
  isImageSelected = false;
  constructor(private x:FormBuilder, private userService:UserService, private router:Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('connectedUser'));
    if (!this.user || this.user.role == 'admin') {
      this.router.navigate(['/error'])
    };
    this.profileForm = this.x.group({
      id: this.user.id,
      firstName: [''],
      lastName: [''],
      email: [''],
      tel: ['',[ Validators.minLength(8)]],
      address: [''],
      pwd: ['', [Validators.minLength(6)]],
      about: [''],
      img: [""],
    });
  }

  profileUpdate() {
    this.userService.profileUpdate(this.profileForm.value, this.profileForm.value.img).subscribe(
      (response) => {
        console.log('here response from BE', response);
        if (response.msg == true) {
          Swal.fire({
            icon: 'success',
            title: 'Updated successfully',
            showConfirmButton: false,
            timer: 1500
          }).then(() => { 
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

  onImageSelected(event: any) {
    const file = event.target.files[0];
    this.profileForm.patchValue({ img: file });
    this.profileForm.get('img').updateValueAndValidity();
    this.isImageSelected = true;

    // Image preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  
}
