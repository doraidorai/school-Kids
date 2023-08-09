import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  imagePreview: string;
  courseForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private x:FormBuilder, private dialogRef: MatDialogRef<CourseFormComponent>) { }

  ngOnInit() {
    this.courseForm = this.x.group({
      teacherId: this.data.id,
      name: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      description: ['', [Validators.required]],
      img: [""],
    });
  }
  onSave() {
    let fData = new FormData();
    let formValue = this.courseForm.value;

    fData.append('teacherId', formValue.teacherId);
    fData.append('name', formValue.name);
    fData.append('duration', formValue.duration);
    fData.append('description', formValue.description);
    fData.append('img', formValue.img);
    this.dialogRef.close(fData);
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    this.courseForm.patchValue({ img: file });
    this.courseForm.get('img').updateValueAndValidity();

    // Image preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
