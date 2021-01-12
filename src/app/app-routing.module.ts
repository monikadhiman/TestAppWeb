import { QuesdetailsComponent } from './teacher/quesdetails/quesdetails.component';
import { PagenotfoundstudentComponent } from './student/pagenotfoundstudent/pagenotfoundstudent.component';
import { ScoreComponent } from './student/score/score.component';
import { AnswerComponent } from './student/answer/answer.component';
import { StutestComponent } from './teacher/stutest/stutest.component';
import { PagenotfoundteacherComponent } from './teacher/pagenotfoundteacher/pagenotfoundteacher.component';
import { QuestionComponent } from './teacher/question/question.component';
import { TeacherdetailsComponent } from './admin/teacherdetails/teacherdetails.component';
import { SubjectdetailsComponent } from './admin/subjectdetails/subjectdetails.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { StudentdashboardComponent } from './student/studentdashboard/studentdashboard.component';
import { TeacherdashboardComponent } from './teacher/teacherdashboard/teacherdashboard.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UserregComponent } from './userreg/userreg.component';
import { SturegComponent } from './stureg/stureg.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursedetailsComponent } from './admin/coursedetails/coursedetails.component';
import { PagenotfoundforadminComponent } from './admin/pagenotfoundforadmin/pagenotfoundforadmin.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'userreg', component: UserregComponent },
  { path: 'stureg', component: SturegComponent },
  {
    path: 'admindashboard' , children: [
      // { path: '', redirectTo: 'admindashboard', pathMatch: 'full' },
      { path: '', component: AdmindashboardComponent },
      { path: 'course', component: CoursedetailsComponent },
      { path: 'subject', component: SubjectdetailsComponent },
      { path: 'teacher', component: TeacherdetailsComponent },
      { path: '**', component: PagenotfoundforadminComponent }]
  },
  {
    path: 'teacherdashboard', children: [
      // { path: '', redirectTo: 'admindashboard', pathMatch: 'full' },
      { path: '', component: TeacherdashboardComponent },
      { path: 'stutest', component: StutestComponent },
      { path: 'question', component: QuestionComponent },
      { path: 'quesDetails', component: QuesdetailsComponent },
      { path: '**', component: PagenotfoundteacherComponent }]
  },
  { path: 'studentdashboard', children: [
    { path: '', component: StudentdashboardComponent },
    { path: 'answer', component: AnswerComponent },
    { path: 'score', component: ScoreComponent },
    { path: '**', component: PagenotfoundstudentComponent }]

  },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
