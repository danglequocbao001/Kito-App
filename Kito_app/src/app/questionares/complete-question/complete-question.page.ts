import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-complete-question',
  templateUrl: './complete-question.page.html',
  styleUrls: ['./complete-question.page.scss'],
})
export class CompleteQuestionPage implements OnInit {
  score = 0;
  imgUrl = '';
  title = '';
  win = new Audio();
  lose = new Audio();
  questionsLength = 0;
  buttons = [
    {
      name: 'Chơi tiếp',
      routerLink: 'questionares',
    },
    {
      name: 'Thoát',
      routerLink: 'main/catechism-class'
    }
  ]
  constructor( private modalCtrl: ModalController,
    
    private route:Router) { }

  ngOnInit() {
    this.loadAudios();
    this.init();
  }

  ionViewWillLeave() {
    localStorage.removeItem('score');
    localStorage.removeItem('questionsLength');
    this.pauseAudios();
  }

  init() {
    this.questionsLength = parseInt(localStorage.getItem('questionsLength'));
    localStorage.removeItem('questionType');
    localStorage.removeItem('questionTypeName');
    this.score = parseInt(localStorage.getItem('score'));
    this.lose.play();
    if ( this.score == this.questionsLength) {
      this.imgUrl = '../../assets/img/questionares/success.svg';
      this.title = 'HOÀN THÀNH XUẤT SẮC !';
      this.win.play();
      this.lose.pause();
    } else {
      this.imgUrl = '../../assets/img/questionares/try-more.svg'
      this.title = 'HÃY CỐ GẮNG HƠN !';
    }
  }

  loadAudios() {
    this.win.src = "https://res.cloudinary.com/baodang359/video/upload/v1615538814/kito-music/win_pnfljg.mp3"; this.win.load();
    this.lose.src = "https://res.cloudinary.com/baodang359/video/upload/v1615538814/kito-music/lose_hpvlu2.mp3"; this.lose.load();
  }

  pauseAudios() {
    this.win.pause();
    this.lose.pause();
  }

  async closeCompleteQuestion(value) {
    this.route.navigateByUrl(value);
    await this.modalCtrl.dismiss();
  }

}
