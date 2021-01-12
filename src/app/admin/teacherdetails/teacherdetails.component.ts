import { Assign } from './../assign';
import { Subject } from './../subject';
import { User } from './../user';
import { Teacher } from './../teacher';
import { AdminService } from '../admin.service';
import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../course';
@Component({
  selector: 'app-teacherdetails',
  templateUrl: './teacherdetails.component.html',
  styleUrls: ['./teacherdetails.component.css']
})
export class TeacherdetailsComponent implements OnInit {
  totalRecords: number;
  page = 1;

  atotalRecords: number;
  apage = 1;
  msgStatus: boolean;
  allTeacher: Observable<Teacher[]>;
  teacher: Teacher[] = [];

  allActiveTeacher: Observable<User[]>;
  activeTeacher: User[] = [];

  allActiveCourse: Observable<Course[]>;
  allCourse: Course[] = [];

  allTeacherSubject: Observable<any[]>;
  teacherSubject: any[] = [];
  delRes: number;
  cid: number;
  uid: number;
  subid: number;
  allActiveSubject: Observable<Subject[]>;
  allSubject: Subject[] = [];
  allActiveSub: Observable<any[]>;
  allSub: any[] = [];
  result: string;
  insertForm: FormGroup;
  updateForm: FormGroup;
  uId: FormControl;
  subId: FormControl;
  cId: FormControl;

  Uid: FormControl;
  Subid: FormControl;
  Cid: FormControl;
  aId: FormControl;

  status: string;
  alert: boolean;
  modalMessage: string;
 msg: string;
  modalRef: BsModalRef;
  msg2: string;
  msgStatus2: boolean;
  @ViewChild('template') modal: TemplateRef<any>;
  @ViewChild('editTemplate') editmodal: TemplateRef<any>;
  constructor(
    private adservice: AdminService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.modalMessage = '';
    this.alert = false;
    this.msg = null;
    this.msg2 = null;
    this.getNonActiveTeacher();
    this.getTeacher();
    this.getCourse();
    this.getSub();
    this.getAllSubjectTeacherDetails();
    this.uId = new FormControl('', [Validators.required]);
    this.subId = new FormControl('', [Validators.required]);
    this.cId = new FormControl('', [Validators.required]);
    this.insertForm = this.fb.group({
      uId: this.uId,
      cId: this.cId,
      subId: this.subId
    });
    this.Uid = new FormControl('', [Validators.required]);
    this.Subid = new FormControl('', [Validators.required]);
   // this.Cid = new FormControl('', [Validators.required]);
    this.aId = new FormControl('');
    this.updateForm = this.fb.group({
      aId: this.aId,
      Uid: this.Uid,
      Subid: this.Subid,
     // Cid: this.Cid
    });
  }

  onUpdateModal(editSubject: any): void {

    this.aId.setValue(editSubject.aId);
    this.Uid.setValue(editSubject.uId);
   // this.Cid.setValue(editSubject.cId);
    this.Subid.setValue(editSubject.subId);

    this.updateForm.setValue({
      aId: this.aId.value,
     Uid: this.Uid.value,
   //  Cid: this.Cid.value,
     Subid: this.Subid.value
   });

    this.modalRef = this.modalService.show(this.editmodal);
  }
  onUpdate() {
    const editSubject = this.updateForm.value;
   // tslint:disable-next-line: align
    this.adservice.editTeacherSubject(editSubject).subscribe((result: any) => {
    //  console.warn(editSubject);
      if (result === 'Exists') {
        this.alert = true;
        this.status = 'Warning! ';
        this.modalMessage =
          'Duplicate entry....';

      } else {
        if (Number(result) > 0) {

          this.alert = true;
          this.status = 'Success! ';
          this.modalMessage = 'Assign Subject To Teacher Updated Successfully';
          this.getTeacher();
          this.getCourse();
          this.getAllSubjectTeacherDetails();
          this.getSub();
          this.updateForm.reset();
          this.updateForm.controls.Uid.setValue('', 'Select Teacher');
         // this.updateForm.controls.cId.setValue('', 'Select Course');
          this.updateForm.controls.Sub.setValue('', 'Select Subject');
        } else {
          this.alert = true;
          this.status = 'Alert! ';
          this.modalMessage = 'Could not Updated Subject to Teacher';
        }
      }
    });
  }

getAllSubjectTeacherDetails() {
    this.allTeacherSubject = this.adservice.getAllSubjectTeacherDetails();
    this.allTeacherSubject.subscribe((result: any) => {

      if (result.length === 0) {

        this.msgStatus2 = true;
        this.msg2 = 'No Data Available';
      }
      else {

        this.msgStatus2 = false;
        this.teacherSubject = result;
        this.atotalRecords = this.teacherSubject.length;

      }

    });
  }

changeCourse(e) {
    this.cid = e.target.selectedOptions[0].value;

    this.allActiveSubject = this.adservice.getSubject(this.cid );
    this.allActiveSubject.subscribe((result: any) => {
      this.allSubject = result;


    });
  }

onSubmit(insertForm: any)
{
    const res: any = {
      uId: this.uid,
      subId: this.subid,
      isActive: true,
    };
  //  console.log(res);
    this.adservice.addTeacherSubject(res).subscribe(
      (result: any) => {
      //  console.warn(result);
        if (result === 'Exists') {
          this.alert = true;
          this.status = 'Warning! ';
          this.modalMessage = 'Duplicate entry, try again....';

        }

        else {
          if (Number(result) > 0) {
            this.alert = true;
            this.status = 'Success! ';
            this.modalMessage = 'Assign Subject to Teacher Successfully';
            this.getTeacher();
            this.getCourse();
            this.getAllSubjectTeacherDetails();
            this.insertForm.reset();
            this.insertForm.controls.uId.setValue('', 'Select Teacher');
            this.insertForm.controls.cId.setValue('', 'Select Course');
            this.insertForm.controls.subId.setValue('', 'Select Subject');
          }
          else {
            this.alert = true;
            this.status = 'Alert! ';
            this.modalMessage = 'Could not assign subject to teacher';
          }
        }
      });


  }
changeUid(e){
    this.uid = e.target.selectedOptions[0].value;
  //  console.warn(this.uid);
  }
changeSubject(e){
    this.subid = e.target.selectedOptions[0].value;
  }
getTeacher()
{
    this.allActiveTeacher = this.adservice.getTeacher();
    this.allActiveTeacher.subscribe((result: any) => {
      this.activeTeacher = result;

    });
  }
getCourse() {
  this.allActiveCourse = this.adservice.getOnlyActiveCourse();
  this.allActiveCourse.subscribe((result: any) => {
      this.allCourse = result;

    });
  }
  getSub() {
    this.allActiveSub = this.adservice.getSub();
    this.allActiveSub.subscribe((result: any) => {
      this.allSub = result;

    });
  }
getNonActiveTeacher() {
    this.allTeacher = this.adservice.getNonActiveTeacher();
    this.allTeacher.subscribe((result: any) => {
    // console.log(result);

     if (result.length === 0)
      {
        this.msgStatus = true;
        this.msg = 'No teacher available for role assigning';
      }
      else
      {
        this.msgStatus = false;
        this.teacher = result;
        this.totalRecords = this.teacher.length;
        this.getAllSubjectTeacherDetails();

      }
    });
    }
updateTeacherRole(teacher: Teacher) {
    this.adservice.updateTeacherRole(teacher).subscribe(data =>
      {
        this.getNonActiveTeacher();

      });
 }
openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  closeAlert2() {
    this.modalRef.hide();
    this.alert = false;
   // this.router.navigateByUrl('/teacher');
  }
  closeMe() {
    this.modalRef.hide();
    this.insertForm.reset();
    this.alert = false;
    this.modalMessage = '';
    this.insertForm.controls.uId.setValue('', 'Select Teacher');
    this.insertForm.controls.cId.setValue('', 'Select Course');
    this.insertForm.controls.subId.setValue('', 'Select Subject');

  }
  closeMe2() {
    this.modalRef.hide();
    this.alert = false;
    this.modalMessage = '';
    this.updateForm.controls.Uid.setValue('', 'Select Teacher');
   // this.insertForm.controls.cId.setValue('', 'Select Course');
    this.updateForm.controls.Subid.setValue('', 'Select Subject');

  }
  onChangeEvent(event: any) {
    if (event.isTrusted === true) {
      this.modalMessage = '';
      this.alert = false;
    }
  }
delTeacherSubject(assign: Assign)
{
    this.adservice.deleteTeacherSubject(assign).subscribe((data: any) => {
      this.delRes = data;
    //  console.log(this.delRes);
      if (this.delRes === 1) {
        alert('Subject Deactivated Successfully');

        this.getNonActiveTeacher();
        this.getTeacher();
        this.getCourse();
        this.getAllSubjectTeacherDetails();
      }
      else {
        alert('Subject Activated Successfully');
        this.getNonActiveTeacher();
        this.getTeacher();
        this.getCourse();
        this.getAllSubjectTeacherDetails();
      }
    });
  }

}

