import { Course } from './../course';
import { LoginregService } from './../loginreg.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NgForm, Validators, AbstractControl, ValidatorFn, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-stureg',
  templateUrl: './stureg.component.html',
  styleUrls: ['./stureg.component.css']
})
export class SturegComponent implements OnInit {

  title: string;
  regForm: FormGroup;
  fullName: FormControl;
  email: FormControl;
  password: FormControl;
  cpassword: FormControl;
  roleId: FormControl;
  isActive: FormControl;
  cId: FormControl;
  message: string;
  errorList: string[];
  alert: boolean;
  status: string;
  res: object;
  allCourse: Observable<Course[]>;
  course: Course[] = [];
  cid: number;
  loginStatus: boolean;
  constructor(private fb: FormBuilder, private router: Router, private loginregService: LoginregService) { }

  ngOnInit(): void {
    this.loginStatus = false;
    this.getCourse();
    this.message = '';
    this.alert = false;
    this.status = '';
    this.title = 'STUDENT FORM';
    this.fullName = new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
    this.cpassword = new FormControl('', [Validators.required]);
    this.cId = new FormControl('', [Validators.required]);
    this.regForm = this.fb.group(
      {
        fullName: this.fullName,
        email: this.email,
        password: this.password,
        cpassword: this.cpassword,
        cId: this.cId
         },
      {
        validator: this.MustMatch('password', 'cpassword')
      }
    );
  }
  getCourse() {
    this.allCourse = this.loginregService.getCourse();
    this.allCourse.subscribe(result => {
      this.course = result;
      console.log(this.course);
    });
  }
  //  MustMatch(password: AbstractControl): ValidatorFn {
  //   return (cpassword: AbstractControl): { [key: string]: boolean } => {
  //     // return null if controls haven't initialised yet
  //     if (password.value !== cpassword.value) {
  //       return { mustMatch: true };
  //     }
  //     else {
  //       return null;
  //     }

  //   };


  // }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  onSubmit(regForm: any) {
    // console.warn(this.regForm.errors);
    const userDetails: any = {
      fullName: this.fullName.value,
      email: this.email.value,
      password: this.password.value,
      roleId: '3',
      isActive: true,
      cId: this.cid
          };
    this.loginregService.createuser(userDetails).subscribe((result: any) => {
      this.res = result;

      if (result === 'Email Id already Exists') {
        this.alert = true;
        this.status = 'Warning';
        this.message = 'Email Id Already Exists';
      }
      else if (result === 'Data Inserted Successfully') {
        this.alert = true;
        this.status = 'Success';
        this.message = 'User Created Successfully';
        this.regForm.reset();
        this.regForm.controls.cId.setValue('', 'Select Course');
        this.loginStatus = true;
      }
      else {
        this.alert = true;
        this.status = 'Warning';
        this.message = 'Please Check Your Validations';
      }
    });
  }
  closeAlert() {
    if (this.loginStatus === true) {
      this.alert = false;
      this.router.navigate(['/login']);
    }
  }
  onClick() {
    this.regForm.reset({});
    this.regForm.controls.cId.setValue('', 'Select Course');
  }
  changeCourse(e) {
    this.cid = e.target.selectedOptions[0].value;
  }
  onChangeEvent(event: any) {
    if (event.isTrusted === true) {

      this.alert = false;

    }


  }
}
