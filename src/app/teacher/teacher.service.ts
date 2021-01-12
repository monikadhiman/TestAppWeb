
import { Question } from './question';
import { Teststu } from './teststu';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  url = 'http://localhost:50650/api/Teacher';
  constructor(private http: HttpClient) { }
  addTest(tststu: Teststu): Observable<Teststu> {
    return this.http.post<Teststu>(this.url + '/AddTest', tststu);
  }
  getTeacherDetails(email: string): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/GetTeacherDetails?email=' + email);
  }
  getTeacherCourse(email: string): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/GetTeacherCourse?email=' + email);
  }
  getTeacherSubject(email: string, cid: number): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/GetTeacherSubject?email=' + email + '&cid=' + cid);
  }
  getAId(email: string, subid: number): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/GetAId?email=' + email + '&subid=' + subid );
  }
  getSub(email: string, cid: number): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/GetSub?email=' + email + '&cid=' + cid);
  }
  getTestDetails(email: string): Observable<Teststu[]> {
    return this.http.get<Teststu[]>(this.url + '/GetTestDetails?email=' + email);
  }
  getTestId(email: string): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/GetTestId?email=' + email);
  }
  getCourseid(email: string): Observable<any[]> {
    
    return this.http.get<any[]>(this.url + '/GetCourseid?email=' + email);
  }
  getSubid(email: string): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/GetSubid?email=' + email);
  }
  getTestdet(testName: string, cId: number, subId: number): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/GetTestdet?testName=' + testName + '&cId=' + cId + '&subId=' + subId);
  }
  getQuestionDetails(email: string, tstId: number): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/GetQuestionDetails?email=' + email + '&tstId=' + tstId);
  }
  getQuestionDetails1(email: string): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/GetQuestionDetails1?email=' + email);
  }
  addQues(ques: Question): Observable<Question> {
    return this.http.post<Question>(this.url + '/AddQues', ques);
  }
  deleteTest(testId: number): Observable<number> {
    return this.http.delete<number>(this.url + '/DeleteTest?TestId=' + testId);
  }
  deleteQuestion(quesId: number): Observable<number> {
    return this.http.delete<number>(this.url + '/DeleteQuestion?quesid=' + quesId);
  }
  editTest(user): Observable<any> {
    const testDetails = {
      tstId: user.testId,
      tstName: user.testName,
      cId: Number(user.courseId),
      subId: Number(user.subjectId)
    };
    console.warn(user);
    console.warn(testDetails);
    return this.http.put<any>(this.url + '/EditTest/', testDetails);
  }

  // getTeacher(): Observable<User[]> {
  //   return this.http.get<User[]>(this.url + '/GetTeacher');
  // }
  // getCourse(): Observable<Course[]> {
  //   return this.http.get<Course[]>(this.url + '/GetCourse');
  // }
}
