import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-navbarteacher',
  templateUrl: './navbarteacher.component.html',
  styleUrls: ['./navbarteacher.component.css']
})
export class NavbarteacherComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  logout() {
    localStorage.removeItem('fullName');
    localStorage.clear();
    this.router.navigate(['/login']);

  }
}
