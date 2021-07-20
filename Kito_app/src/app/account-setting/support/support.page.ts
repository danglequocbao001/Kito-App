import { AccountService } from './../../@app-core/http/account/account.service';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
  @ViewChild('searchBar') searchBar: any;
  @Output() output = new EventEmitter<string>();
  input = '';
  hiddenSearchBar = true;
  supports: any;
  constructor(
    private PlatForm: Platform,
    private speechRecognition: SpeechRecognition,
    private accountService: AccountService,
    private alertController: AlertController,

  ) { }
  headerCustom = { title: 'Trợ Giúp' };

  ngOnInit() {
    this.accountService.showSupports().subscribe((data) => {
      this.supports = data.supports;
    })
  }
  toggleHideSearchBar(value) {
    this.hiddenSearchBar = value;
    if (!value) {
      this.searchBar.setFocus();
    }
  }
  startVoice() {
    this.PlatForm.ready().then(() => {
      this.speechRecognition.requestPermission().then(
        async () => {
          await this.startVoiceRecord();
          this.searchBar.setFocus();
        }
      )
    })
    return;
  }
  startVoiceRecord() {
    this.speechRecognition.startListening().subscribe((matches: Array<string>) => {
      this.input = matches[0];
    })
  }
  changeInput(value) {
    this.output.emit(value);
  }

  async openSupport(support) {
    const alert = await this.alertController.create({
      header: support.answer,
      mode: 'ios',
      buttons: [
        {
          text: 'Đồng ý',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }
}
