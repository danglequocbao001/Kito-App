import { QuestionaresService } from './../../@app-core/http/questionares/questionares.service';
import { LoadingService } from './../../@app-core/utils/loading.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";
import { ToastService } from "src/app/@app-core/utils";
import { CompleteQuestionPage } from "../complete-question/complete-question.page";

@Component({
  selector: "app-question",
  templateUrl: "./question.page.html",
  styleUrls: ["./question.page.scss"],
})
export class QuestionPage implements OnInit {
  musicType = true;

  questionTypeName = '';

  heart = 3;
  score = 0;

  questionCounter = 0;
  answerValue = "";
  answerKey = "";
  questionsLength = 0;

  time: BehaviorSubject<string> = new BehaviorSubject("00:00");
  timer: number;
  forTimer: any;

  questions = [];

  soundtrack1 = new Audio();
  right = new Audio();
  wrong = new Audio();

  hasModal = false;

  rules = [
    {
      rule: 'Người chơi chọn chủ đề hoặc cấp độ để bắt đầu trò chơi.'
    },
    {
      rule: 'Mỗi lượt chơi sẽ có một số câu hỏi với 4 đáp án A, B, C, D (thời gian là 12s/1 câu). Người chơi chọn 1 trong 4 đáp án để trả lời câu hỏi.'
    },
    {
      rule: 'Người chơi có 3 mạng, mỗi câu trả lời sai sẽ bị trừ 1 mạng. Đến khi hết 3 mạng sẽ kết thúc trò chơi.'
    },
    {
      rule: 'Điểm sau khi kết thúc sẽ được tích lũy vào bảng xếp hạng.'
    }
  ]

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private modalController: ModalController,
    private toastService: ToastService,
    private loadingService: LoadingService,
    private QuestionaresService: QuestionaresService
  ) {

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadingService.present();
    this.checkQuestionType();
    this.soundtrack1.play();
    localStorage.setItem("score", "0");
  }

  ionViewWillLeave() {
    this.stopTimer();
  }

  async questionSetting() {
    let alertQuestionSetting = await this.alertCtrl.create({
      message: "Lựa chọn",
      mode: "ios",
      buttons: [
        {
          text: "Tiếp tục",
        },
        {
          text: "Quay lại",
          handler: () => {
            this.router.navigate(["questionares/choose-question"]);
          },
        },
        {
          text: "Thoát",
          role: "destructive",
          handler: () => {
            this.questionQuit();
            localStorage.removeItem('score');
          },
        },
      ],
    });
    await alertQuestionSetting.present();
  }

  async questionQuit() {
    let alertQuestionSetting = await this.alertCtrl.create({
      message: "Bạn có muốn thoát?",
      mode: "ios",
      buttons: [
        {
          text: "Hủy",
        },
        {
          text: "Thoát",
          role: "destructive",
          handler: () => {
            localStorage.removeItem("questionType");
            localStorage.removeItem("questionTypeName");
            this.router.navigate(["main/catechism-class"]);
          },
        },
      ],
    });
    await alertQuestionSetting.present();
  }

  async checkQuestionType() {

    if (localStorage.getItem("idTopic") == null && localStorage.getItem('idLevel') == null) {
      await this.loadingService.dismiss();

      this.router.navigateByUrl('questionares');
      return;
    }

    this.questionTypeName = localStorage.getItem('questionTypeName');
    if (localStorage.getItem("idTopic")) {
      this.setUpQuestion('idTopic');
      this.loadAudio();

      return;
    }
    if (localStorage.getItem("idLevel")) {

      this.setUpQuestion('idLevel');
      this.loadAudio();

      return;
    }
  }

  setUpQuestion(idString) {

    this.QuestionaresService.getQuesTopic(JSON.parse(localStorage.getItem(idString))).subscribe((data) => {

      this.questions = data.questions;
      this.loadingService.dismiss();
      this.questionsLength = data.questions.length;
      localStorage.setItem('questionsLength', this.questionsLength.toString());
      this.startTimer(data.questions.length * 12);
      this.questions.push({
        question: '',
        answer: {
          a: '',
          b: '',
          c: '',
          d: '',
          right_answer: ''
        },
        thumb_image: { url: '' }
      })
    });
    localStorage.removeItem(idString)
  }

  setMusicType() {
    if (this.musicType == true) {
      this.soundtrack1.pause();
      this.musicType = false;
    } else {
      this.soundtrack1.play();
      this.musicType = true;
    }
  }

  loadAudio() {
    this.loadingService.present();
    this.soundtrack1.src = "https://res.cloudinary.com/baodang359/video/upload/v1615538818/kito-music/soundtrack1_tgqm5n.mp3"; this.soundtrack1.load();
    this.right.src = "https://res.cloudinary.com/baodang359/video/upload/v1615538813/kito-music/right_omlr5s.mp3"; this.right.load();
    this.wrong.src = "https://res.cloudinary.com/baodang359/video/upload/v1615538813/kito-music/wrong_ghnyzp.mp3"; this.wrong.load();
  }

  startTimer(duration) {
    this.timer = duration;
    this.forTimer = setInterval(() => {
      this.updateTimeValue();
    }, 1000);
  }

  updateTimeValue() {
    let minutes: any = this.timer / 60;
    let seconds: any = this.timer % 60;

    minutes = String("0" + Math.floor(minutes)).slice(-2);
    seconds = String("0" + Math.floor(seconds)).slice(-2);

    const text = minutes + ":" + seconds;
    this.time.next(text);

    --this.timer;

    if (this.timer == 0) {
      this.stopTimer();
      this.updateScore();
      this.openCompleteQuestion();
      this.toastService.presentFail("Hết giờ rồi!", 'top', 1000, 'danger');
    }
  }

  stopTimer() {
    clearInterval(this.forTimer);
    this.soundtrack1.pause();
  }

  btnActivate(e) {
    let answer = document.querySelectorAll(".answer");
    answer.forEach((element) => {
      element.classList.remove("active-button");
    });
    e.target.classList.add("active-button");
  }

  checkAnswerValue(item) {
    this.answerValue = item;
  }

  checkAnswerKey(object, value) {
    this.answerKey = (Object.keys(object).find((key) => object[key] === value)).toUpperCase();
  }

  btnConfirm() {
    this.answerValue = "";
    if (this.answerKey == this.questions[this.questionCounter].answer.right_answer) {
      this.score++;
      localStorage.setItem("score", JSON.stringify(this.score));
      this.toastService.presentSuccess("Đúng rồi!", 'top', 1000, 'success');
      this.right.play();
    } else {
      this.heart--;
      this.toastService.presentFail("Sai rồi!", 'top', 1000, 'danger');
      this.wrong.play();
    }
    if (this.questionCounter >= this.questionsLength - 1 || this.heart < 0 || this.score == this.questionsLength) {
      this.heart = 0;
      this.updateScore();
      this.openCompleteQuestion();
      this.stopTimer();
      this.soundtrack1.pause();
    }
    if (this.questionCounter <= this.questionsLength) {
      this.questionCounter++;
    }
  }

  async openCompleteQuestion() {
    const modal = await this.modalController.create({
      component: CompleteQuestionPage,
      cssClass: "my-custom-class",
      swipeToClose: false,
    });
    await modal.present();
  }

  toggleHasModal(bool) {
    this.hasModal = bool;
  }

  updateScore() {
    this.QuestionaresService.updateScore({ app_user: { score: this.score } }).subscribe((data) => {
    })
  }
}