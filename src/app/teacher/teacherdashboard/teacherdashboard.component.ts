
import { TeacherService } from '../teacher.service';
import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-teacherdashboard',
  templateUrl: './teacherdashboard.component.html',
  styleUrls: ['./teacherdashboard.component.css']
})
export class TeacherdashboardComponent implements OnInit {

  title: string;
  fullName: string;
  modalRef: BsModalRef;
  modalMessage: string;
  alert: boolean;
  loginStatus: boolean;
  loginSession: any;
  allDetails: Observable<any[]>;
  details: any[] = [];
  email: string;
  status: boolean;

  @ViewChild('template') modal: TemplateRef<any>;
  constructor(
    private tservice: TeacherService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('emailId');
    this.getTeacherDetails(this.email);
    this.modalMessage = '';
    this.alert = false;
    this.title = 'Teacher Dashboard';
    this.fullName = localStorage.getItem('fullName');
    this.loginSession = localStorage.getItem('roleId');

    console.log(this.email);
    if (this.loginSession === '2') {
      this.loginStatus = true;
      console.warn(this.fullName);
    }
    else {
      this.loginStatus = false;
      this.router.navigate(['login']);
    }


  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  closeAlert() {
    this.alert = false;
  }
  getTeacherDetails(email: string)
  {
    this.allDetails = this.tservice.getTeacherDetails(email);
    this.allDetails.subscribe((result) => {
      this.details = result;
      if (result.length === 0) {
        this.status = true;
      }
      else{
        return this.details;
      }
    });
  }
}
