import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questionares',
  templateUrl: './questionares.page.html',
  styleUrls: ['./questionares.page.scss'],
})
export class QuestionaresPage implements OnInit {
  headerCustom = { title: 'ĐỐ VUI GIÁO LÝ', background:'transparent', color: '#fff' };
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    localStorage.removeItem('questionType');
    localStorage.removeItem('questionTypeName');
  }

  goToChooseQuestionType(type) {
    this.router.navigate(['questionares/choose-question']);
    localStorage.setItem('questionType', type);
  }

  rule() {
    this.router.navigate(['questionares/rule']);
  }

  rank() {
    this.router.navigate(['questionares/rank']);
  }

}
