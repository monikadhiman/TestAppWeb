import { Answer } from './../answer';
import { StudentService } from './../student.service';
import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, NgForm, FormsModule, ReactiveFormsModule, FormControlName } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { element } from 'protractor';


@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  userForm: FormGroup;
  title: string;
  sno: number;
  email: string;
  roleId: string;
  cId: string;
  fullName: string;
  allQuestion: Observable<any[]>;
  quesdata: any[] = [];
  subid: number;
  status: boolean;
  datashow: number;
  allCourse: Observable<any[]>;
  course: any[] = [];

  allSubject: Observable<any[]>;
  subject: any[] = [];
  allData: Observable<any[]>;
  tstId: number;
  data: any[] = [];
  TestId: number;
  opt: string[] = [];
  qname: string[] = [];
  private modalService: BsModalService;
  constructor(public stuService: StudentService,
              private fb: FormBuilder,
              private router: Router
  ) { }

  // Ist Step
  ngOnInit(): void {

    this.userForm = this.fb.group({
     // question: this.fb.array([this.addQuestionGroup()])
    });


    this.title = 'Question Paper';

    this.email = localStorage.getItem('emailId');
    this.fullName = localStorage.getItem('fullName');
    this.roleId = localStorage.getItem('roleId');
    this.cId = localStorage.getItem('courseId');
    this.getQuestion();
    this.getCourseName(Number(this.cId));
    this.getSubjectName(this.email, Number(this.cId));

    this.status = true;

  }
  // addQuestionGroup() {
  //   return this.fb.group({
  //     quesId: [],
  //     opt: []
  //   });
  // }
  // addQuestion(){
  //   this.questionArray.push(this.addQuestionGroup());
  // }
  // // 3rd Step
  // get questionArray(){
  //   return this.userForm.get('question') as FormArray;
  //   // return <FormArray> this.userForm.get('question') ;
  // }
  changeSubject(e) {
    this.stuService.seconds = 0;
    this.stuService.qnProgress = 0;



    // tslint:disable-next-line: radix
    // if (parseInt(localStorage.getItem('seconds')) > 0){
    //   // tslint:disable-next-line: radix
    //   this.stuService.seconds = parseInt(localStorage.getItem('seconds'));
    //   // tslint:disable-next-line: radix
    //   this.stuService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
    //   this.stuService.qns = JSON.parse(localStorage.getItem('qns'));
    //   if (this.stuService.qnProgress === Number(10))
    //   {
    //     this.router.navigateByUrl('/studentdashboard/score');
    //   }
    //   else
    //   {
    //     this.startTimer();
    //   }

    // }
    // else
    // {

    // this.allData = this.stuService.duplicate(this.email, Number(localStorage.getItem('testId')));
    // this.allData.subscribe(result1 => {
    //     this.data = result1;
    //     console.warn(this.data);
        // if (this.data.length === 0 ) {
         // console.warn("0" + Number(this.data));
    this.subid = e.target.selectedOptions[0].value;
    this.status = false;
    this.stuService.seconds = 0;
    this.stuService.qnProgress = 0;
    this.allQuestion = this.stuService.getQuestions(this.email, Number(this.cId), this.subid, Number(localStorage.getItem('testId')));
    this.allQuestion.subscribe((result: any) => {

      if (result === 'Exists')
      {
        alert('You have give this exam');
      }
      else
      {
         this.stuService.qns = result;

         this.startTimer();

      }
  });
}



startTimer()
{
    this.stuService.timer = setInterval(() => {
      this.stuService.seconds++;
      localStorage.setItem('seconds', this.stuService.seconds.toString());
    }, 1000);
  }
Answer(quesId, choice)
{
    this.stuService.qns[this.stuService.qnProgress].answer = choice;
    localStorage.setItem('qns', JSON.stringify(this.stuService.qns));
    this.stuService.qnProgress++;
    localStorage.setItem('qnProgress', this.stuService.qnProgress.toString());
    if (this.stuService.qnProgress === Number(10)){
      clearInterval(this.stuService.timer);
      this.router.navigateByUrl('/studentdashboard/score');
    }
  }

  // addQuestionControls()
  // {
  //    c onst arr = this.quesdata.map(element => {
  //     return this.fb.control(true);

  //   });

  //    return this.fb.array(arr);

  // }

onClick() {
    this.router.navigateByUrl('/studentdashboard');

  }
getQuestion() {
    this.allQuestion = this.stuService.getQuestion();
    this.allQuestion.subscribe(result => {
      this.quesdata = result;

      localStorage.setItem('testId', this.quesdata[0].tstId);

    });
  }
getCourseName(cid: number) {
    this.allCourse = this.stuService.getCourseName(cid);
    this.allCourse.subscribe(result => {
      this.course = result[0].cName;

    });
  }
getSubjectName(email: string, cid: number) {
    this.allSubject = this.stuService.getSubjectName(email, cid);
    this.allSubject.subscribe(result => {
      this.subject = result;
      console.warn(this.subject);
    });
  }

}


