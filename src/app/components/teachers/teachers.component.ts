import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  teachers:any= [];
  searchText:any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllTeachers().subscribe(
      (response) => { this.teachers = response.teachers }
    );
  }

}
