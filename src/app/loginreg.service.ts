import { Login } from './login';
import { Reg } from './reg';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class LoginregService {
  url = 'http://localhost:50650/api/Reg';
  constructor(private http: HttpClient) { }
  createuser(reg: Reg): Observable<Reg> {
    return this.http.post<Reg>(this.url + '/CreateUsers', reg);
  }
  loginuser(login: Login) {
    return this.http.post(this.url + '/LoginUsers', login);
  }
  getCourse(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url + '/GetCourse');
  }
}
