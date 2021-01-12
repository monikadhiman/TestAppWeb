import { TeacherService } from './../teacher.service';
import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormsModule, ReactiveFormsModule, FormControlName } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Teststu } from '../teststu';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  totalRecords: number;
  page = 1;
  totalRecords1: number;
  page1 = 1;
  modalRef: BsModalRef;
  modalMessage: string;
  email: string;
  alert: boolean;
  status: boolean;
  loginSession: any;
  testId: string;
  courseId: number;
  subjectId: number;
  title: string;
  fullName: string;
  delStatus: boolean;
  status1: string;

  delStatus1: boolean;
  status11: string;
  insertForm: FormGroup;
  tstId: FormControl;
  cId: FormControl;
  subId: FormControl;
  ques: FormControl;
  opt1: FormControl;
  opt2: FormControl;
  opt3: FormControl;
  opt4: FormControl;
  answer: FormControl;
  mark: FormControl;

  updateForm: FormGroup;
  TstId: FormControl;
  CId: FormControl;
  SubId: FormControl;

  allTstId: Observable<any[]>;
  tId: any[] = [];


  allTestid: Observable<any[]>;
  testid: any[] = [];
  allcourseid: Observable<any[]>;
  courseid: any[] = [];
  allsubid: Observable<any[]>;
  subid: any[] = [];
  allQuestion: Observable<any[]>;
  allQuestion1: Observable<any[]>;
  quesdata: any[] = [];
  quesdata1: any[] = [];
  quesdata11: any[] = [];
  constructor(private tservice: TeacherService,
              private modalService: BsModalService,
              private fb: FormBuilder,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.delStatus = false;
    this.email = localStorage.getItem('emailId');
    this.fullName = localStorage.getItem('fullName');
    this.loginSession = localStorage.getItem('roleId');
    this.tstId = new FormControl('', [Validators.required]);
    this.cId = new FormControl('', [Validators.required]);
    this.subId = new FormControl('', [Validators.required]);
    this.ques = new FormControl('', [Validators.required, Validators.maxLength(100)]);
    this.opt1 = new FormControl('', [Validators.required, Validators.maxLength(100)]);
    this.opt2 = new FormControl('', [Validators.required, Validators.maxLength(100)]);
    this.opt3 = new FormControl('', [Validators.required, Validators.maxLength(100)]);
    this.opt4 = new FormControl('', [Validators.required, Validators.maxLength(100)]);
    this.answer = new FormControl('', [Validators.required]);
    this.mark = new FormControl('', [Validators.required]);
    this.getTestId(this.email);
    this.getQuestionDetails1(this.email);
    this.getCourseid(this.email);
    this.getSubid(this.email);
    this.insertForm = this.fb.group({
      tstId: this.tstId,
      cId: this.cId,
      subId: this.subId,
      ques: this.ques,
      opt1: this.opt1,
      opt2: this.opt2,
      opt3: this.opt3,
      opt4: this.opt4,
      answer: this.answer,
      mark: this.mark
    });
    this.modalMessage = '';
    this.alert = false;
    this.title = 'Question';

    this.TstId = new FormControl('', [Validators.required]);
    this.CId = new FormControl('', [Validators.required]);
    this.SubId = new FormControl('', [Validators.required]);
    this.updateForm = this.fb.group({
      TstId: this.tstId,
      CId: this.cId,
      SubId: this.subId,
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  closeAlert() {
    this.alert = false;
  }
  closeAlert2() {
    this.modalRef.hide();
    this.alert = false;
  }
  onClick() {
    this.router.navigateByUrl('/teacherdashboard');

  }
  changetestId(e) {
    this.testId = e.target.selectedOptions[0].value;
   // console.warn(this.testId);


  }
  changecId(e)
  {
    this.courseId = e.target.selectedOptions[0].value;
   // console.warn(this.courseId);
  }
  changesubId(e)
  {
    this.subjectId = e.target.selectedOptions[0].value;


    this.allTstId = this.tservice.getTestdet(this.testId, this.courseId, this.subjectId);
    this.allTstId.subscribe((result: any) => {
      this.tId = result[0].tstId;

    });

  }

  getTestId(email: string) {
    this.allTestid = this.tservice.getTestId(email);
    this.allTestid.subscribe(result => {
      this.testid = result;
     // console.warn(this.testid);
    });
  }
  getCourseid(email: string) {
    this.allcourseid = this.tservice.getCourseid(email);
    this.allcourseid.subscribe(result => {
      this.courseid = result;
      // console.warn(this.testid);
    });
  }
  getSubid(email: string) {
    this.allsubid = this.tservice.getSubid(email);
    this.allsubid.subscribe(result => {
      this.subid = result;
     // console.warn(this.subid)
    });

  }
  getQuestionDetails1(email: string)
  {
    this.allQuestion = this.tservice.getQuestionDetails1(email);
    this.allQuestion.subscribe(result1 => {

      if (result1.length === 0) {
        this.delStatus = true;
        this.status1 = 'No data available';

      }
      else {
        this.delStatus = false;
        this.quesdata = result1;
        this.totalRecords = this.quesdata.length;

      }

      console.warn(this.quesdata);
    });

  }

  onSubmit(insertForm: any) {
    const newTest: any = {
      ques: this.ques.value,
      opt1: this.opt1.value,
      opt2: this.opt2.value,
      opt3: this.opt3.value,
      opt4: this.opt4.value,
      answer: this.answer.value,
      tstId: this.tId,
      mark: this.mark.value
    };
    console.warn(newTest);
    this.tservice.addQues(newTest).subscribe(
      (result) => {
        this.alert = true;
        this.modalMessage = 'Question add successfully';
        this.getTestId(this.email);
        this.getQuestionDetails1(this.email);
        this.insertForm.reset();
        this.insertForm.controls.tstId.setValue('', 'Select Test');
        this.insertForm.controls.cId.setValue('', 'Select Course');
        this.insertForm.controls.subId.setValue('', 'Select Subject');

      },
      (error) => console.warn('Could not add Question')
    );
  }
  close()
  {
    this.modalRef.hide();
    this.modalMessage = '';
    this.insertForm.controls.tstId.setValue('', 'Select Test');
    this.insertForm.controls.cId.setValue('', 'Select Course');
    this.insertForm.controls.subId.setValue('', 'Select Subject');
    this.alert = false;
  }
  onChangeEvent(event: any) {
    if (event.isTrusted === true) {
      this.modalMessage = '';
      this.alert = false;


    }
  }
  deleteQuestion(QuesId: number) {
    this.tservice.deleteQuestion(QuesId).subscribe((data: any) => {
      if (data === 'No Data Found') {
        alert('Data does not exists with this id, so check again');
      }
      else {
        if (Number(data) > 0) {
          alert('Test Deleted Successfully');
          this.getQuestionDetails1(this.email);
        }
        else {


          alert('Test could not delete');

        }
      }

    });

  }
}
