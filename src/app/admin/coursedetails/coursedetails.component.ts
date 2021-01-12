
import { Course } from './../course';
import { AdminService } from '../admin.service';
import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrls: ['./coursedetails.component.css'],
})
export class CoursedetailsComponent implements OnInit {
  // paging properties

  data: Array<any>;
  totalRecords: number;
  page = 1;
  delprop: string;
  toggleStatus: boolean;
  toggle: object;
  title: string;
  fullName: string;

  insertForm: FormGroup;
  courseName: FormControl;
  isActivate: number;
  alert: boolean;
  status: string;
  delStatus: boolean;
  courseIdUpdate = null;
  modalRef: BsModalRef;
  modalMessage: string;
  allCourse: Observable<Course[]>;
  course: Course[] = [];

  // Updating the Course
  updateForm: FormGroup;
  cName: FormControl;
  cId: FormControl;
  resMsg: string;

  @ViewChild('template') modal: TemplateRef<any>;

  @ViewChild('editTemplate') editmodal: TemplateRef<any>;
  constructor(
    private adservice: AdminService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // tslint:disable-next-line: new-parens
    this.data = new Array<any>();
  }

  ngOnInit(): void {
    this.delprop = 'checked';
    this.courseName = new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
    ]);
    this.insertForm = this.fb.group({
      courseName: this.courseName,
    });

    this.cName = new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
    ]);
    this.cId = new FormControl('');
    this.updateForm = this.fb.group({
      cId: this.cId,
      cName: this.cName,
    });

    this.modalMessage = '';
    this.alert = false;
    this.title = 'Course';
    this.getActiveCourse();
  }
  onUpdateModal(editCourse: Course): void {
    // console.log(editCourse);
    // console.log(editCourse.cId);
    this.cId.setValue(editCourse.cId);
    this.cName.setValue(editCourse.cName);

    this.updateForm.setValue({
      cId: this.cId.value,
      cName: this.cName.value,
    });

    this.modalRef = this.modalService.show(this.editmodal);
  }
  getActiveCourse() {
    this.allCourse = this.adservice.getActiveCourse();
    this.allCourse.subscribe((result: any) => {
       if (result.length === 0)
       {
         this.delStatus = true;
         this.status = 'No data available';
       }
       else
       {
           this.delStatus = false;
           this.course = result;
           this.totalRecords = this.course.length;
       }

    });
  }
  logout() {
    localStorage.removeItem('fullName');
    localStorage.clear();
    this.router.navigate(['login']);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  onSubmit(insertForm: any) {
    const newCourse: any = {
      cName: this.courseName.value,
      isActive: true,
    };
    this.adservice.createCourse(newCourse).subscribe((result: any) => {
      // console.warn(result);
      if (result === 'Exists') {
        this.alert = true;
        this.resMsg = 'Warning! ';
        this.modalMessage =
          'Please Choose Course Name with different Name because it is already exists in the database';
      } else {
        if (Number(result) > 0) {
          this.alert = true;
          this.resMsg = 'Success! ';
          this.modalMessage = 'Course add successfully';
          this.getActiveCourse();
          this.insertForm.reset();
        } else {
          this.alert = true;
          this.resMsg = 'Alert! ';
          this.modalMessage = 'Course could not added';
        }
      }
    });
  }

  DeleteCourse(course: Course) {
    this.adservice.deleteCourse(course).subscribe((data: any) => {
      this.getActiveCourse();
    });
  }

  // Update an Existing Product
  onUpdate() {
    const cId = this.updateForm.controls.cId.value;
    const cName = this.updateForm.controls.cName.value;
    // console.warn(cId, cName);
    this.adservice.updateCourse(cId, cName).subscribe((result: any) => {
      if (result === 'Exists') {
        this.alert = true;
        this.resMsg = 'Warning! ';
        this.modalMessage =
          'Please Choose Course Name with different Name because it is already exists in the database';
      } else {
        if (Number(result) > 0) {
          this.alert = true;
          this.resMsg = 'Success! ';
          this.modalMessage = 'Course updated successfully';
          this.getActiveCourse();
          this.updateForm.reset();
        } else {
          this.alert = true;
          this.resMsg = 'Alert! ';
          this.modalMessage = 'Course could not updated';
        }
      }
    });
    //     console.log('Course Updated');
    //     this.alert = true;
    //     this.modalMessage = 'Course Updated successfully';
    //     this.getActiveCourse();
    //     this.updateForm.reset();
    //   }
    //   ,
    //   (error) => console.log('Could Not Update Course')
    // );
    // });
  }
  closeAlert2() {
    this.modalRef.hide();
    this.alert = false;
    this.insertForm.reset();
    this.updateForm.reset();
  }
  closeAlert() {
    this.alert = false;
    this.insertForm.reset();
    this.updateForm.reset();
  }
  closeMe() {
    this.modalRef.hide();
    this.insertForm.reset();
    this.updateForm.reset();
    this.alert = false;
    this.resMsg = '';
  }
  onChangeEvent(event: any) {
    if (event.isTrusted === true) {
      this.resMsg = '';
      this.alert = false;
    }
  }
}
