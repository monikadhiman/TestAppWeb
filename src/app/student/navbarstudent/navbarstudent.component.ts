import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { StudentService } from './../student.service';
@Component({
  selector: 'app-navbarstudent',
  templateUrl: './navbarstudent.component.html',
  styleUrls: ['./navbarstudent.component.css']
})
export class NavbarstudentComponent implements OnInit {

  constructor(private stuService: StudentService,
              private router: Router
  ) { }

  ngOnInit(): void {
  }
  logout() {
    localStorage.removeItem('fullName');
    localStorage.removeItem('email');
    localStorage.removeItem('testId');
    localStorage.clear();
    clearInterval(this.stuService.timer);

    this.router.navigate(['/login']);

  }

}
