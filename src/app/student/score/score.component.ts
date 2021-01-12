import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { StudentService } from './../student.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, NgForm, FormsModule, ReactiveFormsModule, FormControlName } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Score } from '../score';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent implements OnInit {

  email: string;
  fullName: string;
  TestId: number;
  marks: number;

  // tslint:disable-next-line: member-ordering
  public pieChartLabels = [];
  // tslint:disable-next-line: member-ordering
  public pieChartData = [];
  public pieChartType: string;

  constructor(
    public stuService: StudentService,
    private fb: FormBuilder,
    private router: Router
  ) {

  }

  ngOnInit(): void {

    this.email = localStorage.getItem('emailId');
    this.fullName = localStorage.getItem('fullName');
    this.TestId = Number(localStorage.getItem('testId'));
    this.stuService.getAnswers().subscribe((data: any) => {
      this.stuService.correctAnswerCount = 0;
      this.stuService.qns.forEach((e, i) => {
        if (e.answer === Number(data[i])) {
        //  console.warn(e.anwer + ':' + data[i]);
          this.stuService.correctAnswerCount++;
          e.correct = data[i];
        }      });
    });


    this.pieChartLabels = ['Total Marks', 'Obtained Marks'];
    // // tslint:disable-next-line: member-ordering
    // this.pieChartData = [10, this.marks];

    this.pieChartType = 'pie';

  }

onClick(){
        this.router.navigateByUrl('/studentdashboard');
      }
// logout() {
//         localStorage.removeItem('fullName');
//         localStorage.removeItem('email');
//         localStorage.removeItem('testId');
//         localStorage.clear();
//         clearInterval(this.stuService.timer);
//         this.router.navigate(['/login']);
//       }
OnSubmit(){


        const body: Score = {
          email: localStorage.getItem('emailId').toString(),
          score1: Number(this.stuService.correctAnswerCount.toString()),

          timespend: Number(this.stuService.seconds),
          tstId: Number(localStorage.getItem('testId')),
        };
        this.stuService.submitScore(body).subscribe((result: any) => {
      if (result === 1) {
      alert('Data Inserted Successfully');

      localStorage.removeItem('fullName');
      localStorage.removeItem('email');
      localStorage.removeItem('testId');
      localStorage.clear();
      clearInterval(this.stuService.timer);
      this.router.navigate(['/login']);
      //window.location.reload();

      } else {
        alert('Data Not Inserted');
      }
    });
  }
}
