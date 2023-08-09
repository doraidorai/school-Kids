import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userURL: string = 'http://localhost:3000/api/user';
  constructor(private httpClient: HttpClient) { }

  signup(obj, img: File) {

    let fData = new FormData();
    fData.append('firstName', obj.firstName);
    fData.append('lastName', obj.lastName);
    fData.append('email', obj.email);
    fData.append('pwd', obj.pwd);
    fData.append('role', obj.role);
    if (img) {
      fData.append('img', img);
    }
    if (obj.tel) {
      fData.append('tel', obj.tel);
    }
    if (obj.telSon) {
      fData.append('telSon', obj.telSon)
    }
    if (obj.address) {
      fData.append('address', obj.address)
    }
    if (obj.speciality) {
      fData.append('speciality', obj.speciality)
    }

    return this.httpClient.post<{ msg: string }>(this.userURL + '/signup', fData)
  }
  signupTeacher(obj) {
    return this.httpClient.post<{ msg: string }>(this.userURL + '/signupTeacher', obj)
  }
  getAllTeachers() {
    return this.httpClient.get<{ teachers: any }>(this.userURL + '/getAllTeachers');
  }
  getAllStudents() {
    return this.httpClient.get<{ students: any }>(this.userURL + '/getAllStudents');
  }
  getAllParents() {
    return this.httpClient.get<{ parents: any }>(this.userURL + '/getAllParents');
  }
  login(obj) {
    return this.httpClient.post<{ msg: string, connectedUser: any }>(this.userURL + '/login', obj);
  }
  acceptTeacher(obj) {
    return this.httpClient.put<{ msg: boolean }>(this.userURL + '/acceptTeacher', obj);
  }
  deleteTeacher(id) {
    return this.httpClient.delete<{ msg: boolean }>(this.userURL + '/deleteTeacher' + '/' + id);
  }
  deleteStudent(id) {
    return this.httpClient.delete<{ msg: boolean }>(this.userURL + '/deleteStudent' + '/' + id);
  }
  deleteParent(id) {
    return this.httpClient.delete<{ msg: boolean }>(this.userURL + '/deleteParent' + '/' + id);
  }
  profileUpdate(obj, img: File) {
    let fData = new FormData();
    fData.append('id', obj.id);
    if (obj.firstName) {
      fData.append('firstName', obj.firstName);
    }
    if (obj.lastName) {
      fData.append('lastName', obj.lastName);
    }
    if (obj.email) {
      fData.append('email', obj.email);
    }
    if (obj.tel) {
      fData.append('tel', obj.tel);
    }
    if (obj.address) {
      fData.append('address', obj.address);
    }
    if (obj.pwd) {
      fData.append('pwd', obj.pwd);
    }
    if (obj.about) {
      fData.append('about', obj.about);
    }
    if (img) {
      fData.append('img', img);
    }
    return this.httpClient.patch<{ msg: boolean }>(this.userURL + '/profileUpdate', fData)
  }
  saveStudentNote(obj){
    return this.httpClient.post<{ msg: boolean }>(this.userURL + '/saveStudentNote', obj)
  }
  getAllNotes() {
    return this.httpClient.get<{ notes: any }>(this.userURL + '/getAllNotes');
  }
  eventSave(obj, img: File) {
    let fData = new FormData();
    fData.append('title', obj.title);
    fData.append('subtitle', obj.subtitle);
    fData.append('country', obj.country);
    fData.append('date', obj.date);
    if (img) {
      fData.append('img', img);
    }
    return this.httpClient.post<{ msg: boolean }>(this.userURL + '/addEvent', fData)
  }
  getEvents(){
    return this.httpClient.get<{events:any}>(this.userURL + '/getEvents')
  }
  
}

