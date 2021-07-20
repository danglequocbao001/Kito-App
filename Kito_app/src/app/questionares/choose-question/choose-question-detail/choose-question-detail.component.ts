import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionDataService } from '../choose-question.service';
import { Location } from "@angular/common";



@Component({
  selector: 'app-choose-question-detail',
  templateUrl: './choose-question-detail.component.html',
  styleUrls: ['./choose-question-detail.component.scss'],
})
export class ChooseQuestionDetailComponent implements OnInit {
  data;
  headerCustom = { title: '', background: 'transparent', color: '#fff' };

  constructor(
    private questionService: QuestionDataService,
    private location: Location,
    private router: Router,

  ) {

  }

  ngOnInit() {

    this.questionService.currentMessage.subscribe((data) => {

      if (data == "") {
        this.router.navigateByUrl('questionares')
        return
      }
      this.data = data;

    })
  }
  gotoQuestion() {
    if (this.data.level) {
      localStorage.setItem('idLevel', this.data.level);
      localStorage.removeItem("idTopic")
    }
    else {
      localStorage.setItem('idTopic', this.data.id);
      localStorage.removeItem("idLevel")

    }
    this.router.navigate(['questionares/question']);
  }
  goBack() {

    this.location.back()
  }

}
