import { User } from './user';
// import { Course } from './../course';
import {Assign} from './assign';
import { Teacher } from './teacher';
import { Subject } from './subject';
import { Course } from './course';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  url = 'http://localhost:50650/api/Admin';
  constructor(private http: HttpClient) {}
  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.url + '/AddCourse', course);
  }
  getActiveCourse(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url + '/GetActiveCourse');
  }
  getOnlyActiveCourse(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url + '/GetOnlyActiveCourse');
  }
  getTeacher(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/GetTeacher');
  }
  getCourse(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url + '/GetCourse');
  }
  getSub(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/GetSub');
  }
  getAllSubject(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.url + '/GetAllSubject');
  }
  getSubject(cid: number): Observable<Subject[]> {
     return this.http.get<Subject[]>(this.url + '/GetSubject/' + cid);
  }
  deleteSubject(sid): Observable<Course> {
    const subject = {
      subId: sid,
      isActive: false
    };
    console.log(subject);
    return this.http.put<Course>(this.url + '/DeleteSubject/', subject);
  }
  deleteTeacherSubject(aid): Observable<Assign> {
    const assign = {
      aId: aid,
      isActive: false
    };
    console.log(assign);
    return this.http.put<Assign>(this.url + '/DeleteTeacherSubject/', assign);
  }
  updateCourse(cId: number, cName: string): Observable<Course> {
    // console.log(cId, cName);
    return this.http.put<any>(this.url + '/UpdateCourse/' + cId + '/' + cName, null);
  }

  createSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(this.url + '/AddSubject', subject);
  }
  addTeacherSubject(assign: Assign): Observable<Assign> {
    return this.http.post<Assign>(this.url + '/AddTeacherSubject', assign);
  }
  getNonActiveTeacher(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.url + '/GetNonActiveTeacher');
  }
  getAllSubjectTeacherDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/GetAllSubjectTeacherDetails');
  }
  updateTeacherRole(uid): Observable<Teacher> {
    const teacher = {
      uId: uid,
      roleId: 2
    };
    console.log(teacher);
    return this.http.put<Teacher>(this.url + '/UpdateTeacherRole/', teacher );
  }
  deleteCourse(cid): Observable<Course> {
    const course = {
      cId: cid,
      isActive: false
    };
    return this.http.put<Course>(this.url + '/DeleteCourse/', course);
  }

  updateSubject(user): Observable<Subject> {
    const subjectt = {
      subId: user.subId,
      subName: user.subName,
      cId: Number(user.cId)
    };
    // console.log("Sub" , subjectt);
    // console.log("Subject" ,  Subject );
    return this.http.put<Subject>(this.url + '/UpdateSubject/', subjectt);
  }
  editTeacherSubject(user): Observable<any> {

    return this.http.put<any>(this.url + '/EditTeacherSubject/', user);
  }

  getCourseId(cid: number): Observable<Course> {
    console.log(cid);
    const course = {
      cId: cid
    };
    return this.http.post<Course>(this.url + '/GetCourseById', course);
  }
  getActiveSubject(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.url + '/GetActiveSubject');
  }
  // deleteCourse(Course): Observable<any> {
  //   console.log(cId);
  //   return this.http.put(this.url + '/DeleteCourse', cId);
  // }
}
