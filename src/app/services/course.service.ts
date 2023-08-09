import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courseURL: string = 'http://localhost:3000/api/course';
  constructor(private httpClient: HttpClient) { }

  courseSave(obj) {
    return this.httpClient.post<{ msg: boolean }>(this.courseURL + '/courseSave', obj)
  }
  getCoursesById(id) {
    return this.httpClient.get<{ courses: any }>(this.courseURL + '/getCoursesById' + '/' + id);
  }
  deleteCourse(id) {
    return this.httpClient.delete<{ msg: boolean }>(this.courseURL + '/deleteCourse' + '/' + id);
  }
  courseUpdate(obj, img: File) {
    let fData = new FormData();
    fData.append('id', obj.id);
    fData.append('name', obj.name);
    fData.append('duration', obj.duration);
    fData.append('description', obj.description);
    if (img) {
      fData.append('img', img);
    }
    return this.httpClient.patch<{ msg: boolean }>(this.courseURL + '/courseUpdate', fData)
  }
  getAllCourses() {
    return this.httpClient.get<{ courses: any }>(this.courseURL + '/getAllCourses');
  }
  saveAssignInfo(obj){
    return this.httpClient.post<{ msg: boolean }>(this.courseURL + '/saveAssignInfo' , obj);
  }
  getAssignInfo(){
    return this.httpClient.get<{ assignInfo: any }>(this.courseURL + '/getAssignInfo');
  }
}
