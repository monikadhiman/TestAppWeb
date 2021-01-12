import { AdminService } from '../admin.service';
import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  title: string;
  fullName: string;
  modalRef: BsModalRef;
  modalMessage: string;
  alert: boolean;
  loginStatus: boolean;
  loginSession: any;
  @ViewChild('template') modal: TemplateRef<any>;
  constructor(private modalService: BsModalService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.modalMessage = '';
    this.alert = false;
    this.title = 'Admin Dashboard';
    this.fullName = localStorage.getItem('fullName');
    this.loginSession = localStorage.getItem('roleId');
    if (this.loginSession === '1') {
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

}
