import { LoginregService } from './../loginreg.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NgForm, Validators, AbstractControl, ValidatorFn, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from './../login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title: string;
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  alert: boolean;
  message: string;
  emp: object;
  constructor(private fb: FormBuilder, private router: Router, private loginregService: LoginregService) { }

  ngOnInit(): void {
    localStorage.removeItem('emailId');
    this.title = 'LOGIN FORM';
    this.loginForm = this.fb.group(
      {
        email: this.email,
        password: this.password

      }
    );
    this.email = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.alert = false;
    this.message = '';

  }
  onClick() {
    this.loginForm.reset({});
  }
  onSubmit() {

    const login = this.loginForm.value;
    this.login(login);
  }
  login(loginEmployee: Login) {
    this.loginregService.loginuser(loginEmployee).subscribe(
      (employee: any) => {
        this.emp = employee;
        console.warn(this.emp);
        if (employee.length === 0) {
          this.loginForm.reset({});
          this.alert = true;
          this.message = 'User ID/Password Wrong';
        }
        else {
          const role = this.emp[0].roleId;
          localStorage.setItem('roleId', role);

          if (role == null) {
            this.alert = true;
            this.message = 'Your role is not assigned yet';
          }
          else {
           // localStorage.setItem('fullName', JSON.stringify(this.emp[0].fullName));
            localStorage.setItem('fullName', this.emp[0].fullName);
            localStorage.setItem('emailId', this.emp[0].email);
            localStorage.setItem('courseId', this.emp[0].cId);

            // console.warn("this is" + this.emp[0].email);
            if (role === 1)
            {
              this.router.navigate(['admindashboard']);
            }
            else if (role === 2) {
              this.router.navigate(['teacherdashboard']);
            }
            else {
              this.router.navigate(['studentdashboard']);
            }
          }
        }

      });
  }
  closeAlert() {
    this.alert = false;
    this.loginForm.reset();
    this.router.navigate(['/login']);
  }
  onChangeEvent(event: any) {
    if (event.isTrusted === true) {

       this.alert = false;
       this.message = '';
       this.loginForm.reset();

    }

  }

}

