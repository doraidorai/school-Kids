import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses:any= [];
  constructor(private courseService: CourseService) { }

  ngOnInit() {const imageContainers = document.querySelectorAll('.image-container') as NodeListOf<HTMLElement>;

  imageContainers.forEach((container) => {
    container.addEventListener('wheel', (event: WheelEvent) => {
      event.preventDefault();
      container.scrollLeft += event.deltaY;
    });
  });
  this.courseService.getAllCourses().subscribe(
    (response) => { this.courses = response.courses }
  );
  }

}
