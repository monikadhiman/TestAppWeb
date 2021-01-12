import { QuestionComponent } from './teacher/question/question.component';
import { StutestComponent } from './teacher/stutest/stutest.component';
import { TeacherService } from './teacher/teacher.service';
import { NavbarteacherComponent } from './teacher/navbarteacher/navbarteacher.component';
import { SubjectdetailsComponent } from './admin/subjectdetails/subjectdetails.component';
import { CoursedetailsComponent } from './admin/coursedetails/coursedetails.component';
import { AdminService } from './admin/admin.service';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { LoginregService } from './loginreg.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ChartsModule} from 'ng2-charts';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import { SturegComponent } from './stureg/stureg.component';
import { UserregComponent } from './userreg/userreg.component';
import { TeacherdashboardComponent } from './teacher/teacherdashboard/teacherdashboard.component';
import { StudentdashboardComponent } from './student/studentdashboard/studentdashboard.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TeacherdetailsComponent } from './admin/teacherdetails/teacherdetails.component';
import { PagenotfoundteacherComponent } from './teacher/pagenotfoundteacher/pagenotfoundteacher.component';
import { AnswerComponent } from './student/answer/answer.component';
import { ScoreComponent } from './student/score/score.component';
import { PagenotfoundstudentComponent } from './student/pagenotfoundstudent/pagenotfoundstudent.component';
import { NavbarstudentComponent } from './student/navbarstudent/navbarstudent.component';
import { StudentService } from './student/student.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { QuesdetailsComponent } from './teacher/quesdetails/quesdetails.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PagenotfoundComponent,
    LoginComponent,
    SturegComponent,
    UserregComponent,
    TeacherdashboardComponent,
    StudentdashboardComponent,
    AdmindashboardComponent,
    NavbarComponent,
    CoursedetailsComponent,
    SubjectdetailsComponent,
    TeacherdetailsComponent,
    PagenotfoundteacherComponent,
    NavbarteacherComponent,
    StutestComponent,
    QuestionComponent,
    AnswerComponent,
    ScoreComponent,
    PagenotfoundstudentComponent,
    NavbarstudentComponent,
    QuesdetailsComponent,

  ],
  imports: [
    ChartsModule,
    BrowserModule,
    UiSwitchModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [LoginregService, AdminService, TeacherService, StudentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
