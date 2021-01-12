import { TeacherService } from './../teacher.service';
import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormsModule, ReactiveFormsModule, FormControlName } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Teststu } from '../teststu';
@Component({
  selector: 'app-quesdetails',
  templateUrl: './quesdetails.component.html',
  styleUrls: ['./quesdetails.component.css']
})
export class QuesdetailsComponent implements OnInit {

  totalRecords1: number;
  page1 = 1;
  delStatus: boolean;
  status1: string;
  email: string;
  alert: boolean;
  status: boolean;
  loginSession: any;
  testId: string;
  courseId: number;
  subjectId: number;
  title: string;
  fullName: string;

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
  constructor(private tservice: TeacherService,
              private fb: FormBuilder,
              private router: Router
  ) {


   }

  ngOnInit(): void {
    this.delStatus = false;
    this.email = localStorage.getItem('emailId');
    this.fullName = localStorage.getItem('fullName');
    this.loginSession = localStorage.getItem('roleId');
    this.getTestId(this.email);
    this.getCourseid(this.email);
    this.getSubid(this.email);

    this.title = 'Question';

    this.TstId = new FormControl('',  [Validators.required]);
    this.CId = new FormControl('', [Validators.required]);
    this.SubId = new FormControl('', [Validators.required]);
    this.updateForm = this.fb.group({
      TstId: this.TstId,
      CId: this.CId,
      SubId: this.SubId,
    });
  }

  onClick() {
    this.router.navigateByUrl('/teacherdashboard');

  }
  changetestId(e) {

     this.testId = e.target.selectedOptions[0].value;

  }
  changecId(e) {
    this.courseId = e.target.selectedOptions[0].value;
  }
   changesubId(e) {

    this.subjectId = e.target.selectedOptions[0].value;
    console.warn (this.subjectId);
    this.allTstId = this.tservice.getTestdet(this.testId, this.courseId, this.subjectId);
    this.allTstId.subscribe((result: any) => {
      this.tId = result[0].tstId;
      this.getQuestionDetails(this.email, Number(this.tId));
      // console.warn(this.email, Number(this.tId));
    });

  }
  getQuestionDetails(email: string, testId: number)
  {
    this.allQuestion1 = this.tservice.getQuestionDetails(email, testId);
    this.allQuestion1.subscribe(result1 => {
      console.warn(this.allQuestion1);
      if (result1.length === 0) {
        this.delStatus = true;
        this.status1 = 'No data available';

        this.updateForm.controls.TstId.setValue('', 'Select Test');
        this.updateForm.controls.CId.setValue('', 'Select Course');
        this.updateForm.controls.SubId.setValue('', 'Select Subject');

      }
      else {
        this.delStatus = false;
        this.quesdata1 = result1;
        this.totalRecords1 = this.quesdata1.length;


        this.updateForm.controls.TstId.setValue('', 'Select Test');
        this.updateForm.controls.CId.setValue('', 'Select Course');
        this.updateForm.controls.SubId.setValue('', 'Select Subject');

      }

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
     //  console.warn(this.subid)
    });

  }
   onChangeEvent(event: any) {
    if (event.isTrusted === true) {
    // location.reload()

    //  this.updateForm.controls.TstId.setValue('', 'Select Test');
    //   this.updateForm.controls.CId.setValue('', 'Select Course');
    //  this.updateForm.controls.SubId.setValue('', 'Select Subject');

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
          this.getQuestionDetails(this.email, Number(this.tId));

        }
        else {


          alert('Test could not delete');

        }
      }

    });

  }
}
