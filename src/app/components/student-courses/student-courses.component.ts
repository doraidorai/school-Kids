import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {
  @Input() y: any;
  @Input() userId: any;
  notes:any = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllNotes().subscribe(
      (response) => { this.notes = response.notes }
    );
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
