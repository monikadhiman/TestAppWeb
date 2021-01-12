import { Score } from './score';
import { Answer } from './answer';
// import { Course } from './course';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaxLengthValidator } from '@angular/forms';
import { ScoreComponent } from './score/score.component';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  url = 'http://localhost:50650/api/Student';
  qns: any [];
  seconds: number;
  timer;
  qnProgress: number;
  correctAnswerCount: number = 0;
  constructor(private http: HttpClient) {

   }
  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }
  addScore(score: Score): Observable<Score> {
    return this.http.post<Score>(this.url + '/AddScore', score);
  }
  AddAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(this.url + '/AddAnswer', answer);
  }
  getQuestion(): Observable<any> {
    return this.http.get<any>(this.url + '/GetQuestion');
  }
  // insertParticipant(uId: string, tstId: number): Observable<any>
  // {
  //   const body = {
  //     Uid: uId,
  //     TstId: tstId
  //   };
  //   return this.http.post(this.url + '/InsertParticipant', body);
  // }
  getCourseName(cid: number): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/GetCourseName?cid=' + cid);
  }
  getSubjectName(email: string, cid: number): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/GetSubjectName?email=' + email + '&cid=' + cid);
  }
  getQuestions(email: string, cid: number, subid: number, tstid: number): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/Questions?email=' + email + '&cid=' + cid + '&subid=' + subid + '&tstId1=' + tstid);
  }
  // duplicate(email: string, tstId: number): Observable<any[]> {
  //   return this.http.get<any[]>(this.url + '/Duplicate?email=' + email + '&tstId=' + tstId);
  // }

  getAnswers(){
    const body = this.qns.map(x => x.quesId);
    return this.http.post(this.url + '/Answers' , body);

  }
  submitScore(sc: Score): Observable<Score>
  {
    // const body = {
    //   UId: localStorage.getItem('emailId').toString(),
    //   Score: Number(this.correctAnswerCount),
    //   TimeSpent: Number(this.seconds),
    //   TestId: Number(localStorage.getItem('testId'))
    // };
    return this.http.post<Score>(this.url + '/InsertParticipant' , sc);
  }
}
