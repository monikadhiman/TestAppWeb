import { LoginregService } from './../loginreg.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NgForm, Validators, AbstractControl, ValidatorFn, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-userreg',
  templateUrl: './userreg.component.html',
  styleUrls: ['./userreg.component.css']
})
export class UserregComponent implements OnInit {
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
  modalRef: BsModalRef;
  modalMessage: string;
  submitted: boolean;
  loginStatus: boolean;
  // tslint:disable-next-line: max-line-length
  constructor(private modalService: BsModalService, private fb: FormBuilder, private router: Router, private loginregService: LoginregService) { }
  @ViewChild('template') modal: TemplateRef<any>;

  ngOnInit(): void {
    this.loginStatus = false;
    this.message = '';
    this.alert = false;
    this.status = '';
    this.title = 'REGISTRATION FORM';
    this.fullName = new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
    this.cpassword = new FormControl('', [Validators.required]);

    this.regForm = this.fb.group(
      {
        fullName: this.fullName,
        email: this.email,
        password: this.password,
        cpassword: this.cpassword

      },
     {
       validator: this.MustMatch('password', 'cpassword')
     }

    );


  }
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
  // MustMatch(password: AbstractControl): ValidatorFn {
  //   return (cpassword: AbstractControl): { [key: string]: boolean } => {
  //     // return null if controls haven't initialised yet
  //     if (password.value !== cpassword.value ) {
  //       return { mustMatch: true };
  //     }
  //     else {
  //       return null;
  //     }

  //   };


  // }

   onSubmit() {
    if (this.regForm.valid)
    {
      const userDetails: any = {
        fullName: this.fullName.value,
        email: this.email.value,
        password: this.password.value,
        isActive: true,
      };
      this.loginregService.createuser(userDetails).subscribe((result: any) => {
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
          this.loginStatus = true;
        }
      });
    }
    else
    {
      this.alert = true;
      this.status = 'Warning';
      this.message = 'Please Check Your Validations';
    }
  }


   closeAlert() {
     if (this.loginStatus === true)
     {
       this.status = '';
       this.message = '';
       this.alert = false;
       this.router.navigate(['/login']);
     }
     else
     {
       this.status = '';
       this.message = '';
       this.alert = false;
     }

  }
  onClick() {
    this.regForm.reset({});
  }
  onChangeEvent(event: any) {
    if (event.isTrusted === true) {

      this.alert = false;

    }

  }
}

