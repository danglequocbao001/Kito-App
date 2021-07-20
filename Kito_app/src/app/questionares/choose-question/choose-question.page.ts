import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionaresService } from 'src/app/@app-core/http';
import { QuestionDataService } from './choose-question.service';

@Component({
  selector: 'app-choose-question',
  templateUrl: './choose-question.page.html',
  styleUrls: ['./choose-question.page.scss'],
})
export class ChooseQuestionPage implements OnInit {
  title = '';
  headerCustom = { title: '', background: 'transparent', color: '#fff' };
  questions = [];

  questionType = '';

  constructor(
    private router: Router,
    private questionService: QuestionDataService,
    private questionaresService: QuestionaresService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.setUpQuestion();
    localStorage.removeItem('questionTypeName');
    if (localStorage.getItem('score')) {
      localStorage.removeItem('score');
    }
  }

  setUpQuestion() {
    if (localStorage.getItem('questionType') == 'topic') {
      this.questionaresService.getTopic().subscribe((data) => {
        this.questions = data.question_topics;
        this.checkThumbImage(data.question_topics)
      })
      this.questionType = 'Chủ đề'
      this.title = 'CHỌN CHỦ ĐỀ';
    }
    else if (localStorage.getItem('questionType') == 'level') {
      this.questionaresService.getLevel().subscribe((data) => {
        this.questions = data;
      })
      this.questionType = 'Cấp độ'
      this.title = 'CHỌN CẤP ĐỘ';
    }
    this.headerCustom.title = this.title;
    localStorage.removeItem('questionTypeName');
    if (localStorage.getItem('score')) {
      localStorage.removeItem('score');
    }
  }

  async goToQuestion(name) {
    await this.questionService.changeMessage(name);
    this.router.navigate(['questionares/choose-question/detail']);

    // if (localStorage.getItem('questionType') == 'topic') {
    //   localStorage.setItem('idTopic', name.id);
    // }
    // else if (localStorage.getItem('questionType') == 'level') {
    //   localStorage.setItem('idLevel', name.level);
    // }
    // localStorage.setItem('questionTypeName', this.questionType + ' ' + name.name);
    // this.router.navigate(['questionares/question']);
  }

  checkThumbImage(data) {
    for (let obj of data) {
      if (obj.thumb_image == null) obj.thumb_image = 'src/assets/img/giamphan.jpg'
    }
  }

}
