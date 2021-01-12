import { TeacherService } from './../teacher.service';
import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Teststu } from '../teststu';


@Component({
  selector: 'app-stutest',
  templateUrl: './stutest.component.html',
  styleUrls: ['./stutest.component.css']
})
export class StutestComponent implements OnInit {
  totalRecords: number;
  resMsg: string;
  page = 1;
  title: string;
  fullName: string;

  insertForm: FormGroup;
  tstName: FormControl;
  cId: FormControl;
  subId: FormControl;
  updateForm: FormGroup;
  testId: FormControl;
  testName: FormControl;
  courseId: FormControl;
  subjectId: FormControl;
  statusMsg: string;
  modalRef: BsModalRef;
  modalMessage: string;
  statusMsg1: string;
  alert1: boolean;
  modalMessage1: string;
  isActivate: number;
  alert: boolean;
  subid: number;
  cid: number;
  allDetails: Observable<any[]>;
  allCourse: Observable<any[]>;
  allSubject: Observable<any[]>;
  subject: any[] = [];
  course: any[] = [];
  details: any[] = [];
  email: string;
  status: boolean;
  loginSession: any;
  delStatus: boolean;
  statusT: string;
  allAId: Observable<any[]>;
  aId: any[] = [];

  allTestDetails: Observable<any[]>;
  testdetails: any[] = [];
  singleCourse: Observable<any[]>;
  courses: any[] = [];

  @ViewChild('template') modal: TemplateRef<any>;
  @ViewChild('editTemplate') editmodal: TemplateRef<any>;
  constructor(
    private tservice: TeacherService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('emailId');
    this.fullName = localStorage.getItem('fullName');
    this.loginSession = localStorage.getItem('roleId');
    this.tstName = new FormControl('', [Validators.required, Validators.maxLength(30)]);
    this.cId = new FormControl('', [Validators.required]);
    this.subId = new FormControl('', [Validators.required]);
    this.insertForm = this.fb.group({
      tstName: this.tstName,
      cId: this.cId,
      subId: this.subId,
    });
    this.testName = new FormControl('', [Validators.required, Validators.maxLength(30)]);
    this.courseId = new FormControl('', [Validators.required]);
    this.subjectId = new FormControl('', [Validators.required]);
    this.testId = new FormControl('');
    this.updateForm = this.fb.group({
      testName: this.testName,
      courseId: this.courseId,
      subjectId: this.subjectId,
      testId: this.testId
    });

    this.modalMessage1 = '';
    this.statusMsg1 = '';
    this.alert = false;
    this.modalMessage = '';
    this.statusMsg = '';
    this.alert = false;
    this.title = 'Test Details';
    // this.getActiveCourse();
    this.getTeacherDetails(this.email);
    this.getTeacherCourse(this.email);
    this.getTestDetails(this.email);

  }

  onUpdateModal(editSubject: any): void {
    this.testId.setValue(editSubject.tstId);
    this.testName.setValue(editSubject.tstName);
    this.courseId.setValue(editSubject.cId);
    this.allSubject = this.tservice.getTeacherSubject(this.email, Number(editSubject.cId));
    this.allSubject.subscribe((result: any) => {
      this.subject = result;
    });

    this.subjectId.setValue(editSubject.subId);

    this.updateForm.setValue({
      testId: this.testId.value,
      testName: this.testName.value,
      courseId: Number(this.courseId.value),
      //  Cid: this.Cid.value,
      subjectId: Number(this.subjectId.value),


    });

    this.modalRef = this.modalService.show(this.editmodal);
  }
  onUpdate() {

    const tstdetails = this.updateForm.value;
    console.warn(tstdetails);

    //  console.warn(editSubject);
    this.tservice.editTest(tstdetails).subscribe((result: any) => {
      console.warn(result);
      if (result === 'Exists')
      {
        this.alert1 = true;

        this.modalMessage1 =
          'Duplicate entry....';
      }
      else
      {
          if (Number(result) > 0)
          {


            this.getTestDetails(this.email);
            this.updateForm.reset();
            this.updateForm.controls.courseId.setValue('', 'Select Course');
            this.updateForm.controls.subjectId.setValue('', 'Select Subject');
            this.alert1 = true;

            this.modalMessage1 = 'Test Updated Successfully';

          }
          else
          {
            this.alert1 = true;

            this.modalMessage1 = 'Could not Updated Test';
          }
      }
    });

  }
  closeMe2() {
    this.modalRef.hide();
    this.alert1 = false;
    // this.modalMessage1 = '';
    // this.updateForm.controls.Uid.setValue('', 'Select Teacher');
    // // this.insertForm.controls.cId.setValue('', 'Select Course');
    // this.updateForm.controls.Subid.setValue('', 'Select Subject');

  }
  changeCourse(e) {
    this.subid = e.target.selectedOptions[0].value;
    this.singleCourse = this.tservice.getSub(this.email, this.subid);
    this.singleCourse.subscribe((result: any) => {
      this.courses = result;
      this.updateForm.controls.subjectId.setValue('', 'Select Subject');
    });

    this.allSubject = this.tservice.getTeacherSubject(this.email, Number(this.subid));
    this.allSubject.subscribe((result: any) => {
    this.subject = result;
  });

  }
  changeSubject(e) {
    this.cid = e.target.selectedOptions[0].value;
   // this.subId = e.target.selectedOptions[0].value;

    this.allAId = this.tservice.getAId(this.email, this.cid);
    this.allAId.subscribe((result: any) => {
      this.aId = result[0].aId;
     // console.warn(this.aId);

    });


  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  onSubmit(insertForm: any) {
      const newTest: any = {
        tstName: this.tstName.value,
        cId: Number(this.subid),
        subId: Number(this.cid),
        aId: this.aId

      };
     // console.warn(newTest);
      this.tservice.addTest(newTest).subscribe(
        (result: any) => {
          if (result === 'Exists') {
            this.alert = true;
            this.resMsg = 'Warning! ';
            this.modalMessage =
              'Please Choose Test with different Name because it is already exists in the database';
          } else {
            if (Number(result) > 0) {
              this.alert = true;
              this.resMsg = 'Success! ';
              this.modalMessage = 'Test add successfully';
              this.getTeacherDetails(this.email);
              this.getTeacherCourse(this.email);
              this.getTestDetails(this.email);
              this.insertForm.reset();
              this.insertForm.controls.cId.setValue('', 'Select Course');
              this.insertForm.controls.subId.setValue('', 'Select Subject');
            } else {
              this.alert = true;
              this.resMsg = 'Alert! ';
              this.modalMessage = 'Test could not added';
            }
          }
        });

  }

  closeAlert() {
    this.alert = false;
  }
  closeAlert2() {
    this.modalMessage1 = '';
    this.modalRef.hide();

  }
  onChangeEvent(event: any) {
    if (event.isTrusted === true) {
      this.modalMessage = '';
      this.alert = false;
      this.statusMsg = '';

    }
  }
  onChangeEvent1(event: any) {
    if (event.isTrusted === true) {
      this.modalMessage1 = '';

    }
  }
  getTeacherDetails(email: string) {
    this.allDetails = this.tservice.getTeacherDetails(email);
    this.allDetails.subscribe((result) => {
      if (result.length === 0) {
        this.status = true;
      }
      else {

        this.details = result;
      //  console.warn(this.details);
      }
    });
  }
  getTeacherCourse(email: string) {
    this.allCourse = this.tservice.getTeacherCourse(email);
    this.allCourse.subscribe((result: any) => {
        this.course = result;
    });
  }
  getTestDetails(email: string) {
    this.allTestDetails = this.tservice.getTestDetails(email);
    this.allTestDetails.subscribe((result: any) => {
     // this.testdetails = result;
     // console.warn(this.course);
      if (result.length === 0) {
        this.delStatus = true;
        this.statusT = 'No data available';
      }
      else {
        this.delStatus = false;
        this.testdetails = result;
        this.totalRecords = this.testdetails.length;
      }

    });

  }
  onClick()
  {
    this.router.navigateByUrl('/teacherdashboard');

  }
  closeMe() {
    this.modalRef.hide();
    this.insertForm.reset();
    this.insertForm.controls.cId.setValue('', 'Select Course');
    this.insertForm.controls.subId.setValue('', 'Select Subject');
    this.alert = false;
    this.resMsg = '';
  }
  deleteTest(TstId: number)
  {
    this.tservice.deleteTest(TstId).subscribe((data: any) => {
      if (data === 'No Data Found')
      {
        alert('Data does not exists with this id, so check again');
      }
      else
      {
        if (Number(data) > 0) {
          alert('Test Deleted Successfully');
          this.getTeacherDetails(this.email);
          this.getTeacherCourse(this.email);
          this.getTestDetails(this.email);

        }
        else {
          alert('Test could not delete');

        }
      }

    });

}

}
