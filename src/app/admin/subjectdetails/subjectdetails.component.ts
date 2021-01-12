import { Course } from './../course';
import { Subject } from './../subject';
import { AdminService } from '../admin.service';
import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subjectdetails',
  templateUrl: './subjectdetails.component.html',
  styleUrls: ['./subjectdetails.component.css'],
})
export class SubjectdetailsComponent implements OnInit {
  totalRecords: number;
  page = 1;
  title: string;
  fullName: string;
  modalRef: BsModalRef;
  subName: FormControl;
  insertForm: FormGroup;
  modalMessage: string;
  isActivate: number;
  alert: boolean;
  allSubject: Observable<Subject[]>;
  subject: Subject[] = [];
  allCourse: Observable<Course[]>;
  course: Course[] = [];
  cid: number;
  cId: FormControl;
  // Updating the Subject
  res: string;
  updateForm: FormGroup;
  subId: FormControl;
  subjectName: FormControl;
  courseId: FormControl;
  warning: string;
  status: string;
  delStatus: boolean;
  delRes: number;

  @ViewChild('template') modal: TemplateRef<any>;
  @ViewChild('editTemplate') editmodal: TemplateRef<any>;
  delMsg: string;
  constructor(
    private adservice: AdminService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOnlyActiveCourse();
    this.getActiveSubject();
    this.subName = new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.cId = new FormControl('', [Validators.required]);
    this.insertForm = this.fb.group({
      subName: this.subName,
      cId: this.cId,
    });

    this.modalMessage = '';
    this.alert = false;
    this.title = 'Subject';
    this.warning = null;
    this.subjectName = new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.courseId = new FormControl('', [Validators.required]);
    this.subId = new FormControl('');
    this.updateForm = this.fb.group({
      subId: this.subId,
      subjectName: this.subjectName,
      courseId: this.courseId,
    });
    this.status = null;
    this.modalMessage = '';
    this.alert = false;
    this.title = 'Subject';
    this.getOnlyActiveCourse();
    this.delRes = 0;
  }
  onUpdateModal(editSubject: Subject): void {
    console.log(editSubject);
    // // console.log(editCourse.cId);
    // this.subId.setValue(editSubject.subId);
    // this.subjectName.setValue(editSubject.subName);
    // this.courseId.setValue(editSubject.cId);

    // this.updateForm.setValue({
    //   subId: this.subId.value,
    //   subjectName: this.subjectName.value,
    //   courseId: this.courseId.value,
    // });

    this.modalRef = this.modalService.show(this.editmodal);
  }
  getOnlyActiveCourse() {
    this.allCourse = this.adservice.getOnlyActiveCourse();
    this.allCourse.subscribe((result) => {
      this.course = result;
    //  console.log(this.course);
    });
  }
  getActiveSubject() {
    this.allSubject = this.adservice.getActiveSubject();
    this.allSubject.subscribe((result: any) => {
      if (result.length === 0) {
        this.delStatus = true;
        this.status = 'No data available';
      } else {
        this.delStatus = false;
        this.subject = result;
        this.totalRecords = this.subject.length;
      }
     // console.warn(result);
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmit(insertForm: any) {
    const newSubject: any = {
      subName: this.subName.value,
      cId: this.cId.value,
      isActive: true,
    };
    this.adservice.createSubject(newSubject).subscribe((result: any) => {
      this.res = result;
      if (this.res === 'Exists') {
        this.alert = true;
        this.warning = 'Warning! ';
        this.modalMessage =
          'Duplicate entry, this subject already exists under this course....';
      } else {
        if (Number(this.res) > 0) {
          this.alert = true;
          this.warning = 'Success! ';
          this.modalMessage = 'Subject Added Successfully';
          this.getOnlyActiveCourse();
          this.getActiveSubject();
          this.insertForm.reset();
          // controlEnabled: boolean = true;
          this.insertForm.controls.cId.setValue('', 'Select Course');

        } else {
          this.alert = true;
          this.warning = 'Alert! ';
          this.modalMessage = 'Could not add Subject';
        }
      }
    });
  }
  closeAlert() {
    this.alert = false;
    this.insertForm.reset();
  }
  changeCourse(e) {
    this.cid = e.target.selectedOptions[0].value;
  }
  DeleteSubject(subject: Subject) {
    this.adservice.deleteSubject(subject).subscribe((data: any) => {
      this.delRes = data;
      console.log(this.status);
      if (this.delRes === 1) {
        alert('Subject Deactivated Successfully');

        this.getOnlyActiveCourse();
        this.getActiveSubject();
      } else {
        alert('Subject Activated Successfully');
        this.getOnlyActiveCourse();
        this.getActiveSubject();
      }
    });
  }
  // Update an Existing Product
  onUpdate() {
    const editSubject = this.updateForm.value;
    // console.warn("EDIT", editSubject);
    const user = {
      subId: editSubject.subId,
      subName: editSubject.subjectName,
      cId: Number(editSubject.courseId),
    };

    this.adservice.updateSubject(user).subscribe((result: any) => {
      this.res = result;
    //  console.warn(this.res);
      if (this.res === 'Exists') {
        this.alert = true;
        this.warning = 'Warning! ';
        this.modalMessage =
          'Duplicate entry, this subject already exists under this course....';

      } else {
        if (Number(this.res) > 0) {
          console.log(this.res);
          this.alert = true;
          this.warning = 'Success! ';
          this.modalMessage = 'Subject Updated Successfully';
          this.getOnlyActiveCourse();
          this.getActiveSubject();
          this.updateForm.reset();
          this.updateForm.controls.courseId.setValue('', 'Select Course');
        } else {
          console.log(this.res);
          this.alert = true;
          this.warning = 'Alert! ';
          this.modalMessage = 'Could not Updated Subject';
        }
      }
    });
  }
  closeAlert2() {
    this.modalRef.hide();
    this.alert = false;
  }
  closeMe() {
    this.modalRef.hide();
    this.insertForm.reset();
    this.updateForm.reset();
    this.alert = false;
    this.modalMessage = '';
    this.insertForm.controls.cId.setValue('', 'Select Course');
    this.updateForm.controls.courseId.setValue('', 'Select Course');
  }
  onChangeEvent(event: any) {
    if (event.isTrusted === true) {
      this.modalMessage = '';
      this.alert = false;
    }
  }
}
