import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-studentdashboard',
  templateUrl: './studentdashboard.component.html',
  styleUrls: ['./studentdashboard.component.css']
})
export class StudentdashboardComponent implements OnInit {
  title: string;
  fullName: string;
  loginSession: any;
  email: string;
  constructor(
    private stuservice: StudentService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.email = localStorage.getItem('emailId');
    this.title = 'Student Dashboard';
    this.fullName = localStorage.getItem('fullName');
    this.loginSession = localStorage.getItem('roleId');
  }

}
