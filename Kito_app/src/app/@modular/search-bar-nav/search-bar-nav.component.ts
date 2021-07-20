import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx'

@Component({
  selector: 'app-search-bar-nav',
  templateUrl: './search-bar-nav.component.html',
  styleUrls: ['./search-bar-nav.component.scss'],
})
export class SearchBarNavComponent implements OnInit {
  @ViewChild('search') search: any;
  @Output() output = new EventEmitter<string>();
  input = '';
  hiddenSearchBar = true;
  constructor(
    public PlatForm: Platform,
    private speechRecognition: SpeechRecognition
  ) {
  }
  ngOnInit() {

  }
  async showSearch() {
    // this.hiddenSearchBar = value;
    // if (!value) {
    //   // this.searchBar.setFocus();
    // }
    this.hiddenSearchBar = await false;
    setTimeout(async () => {

      this.search.setFocus()
    }, 100);

  }
  BlurSearch() {
    this.hiddenSearchBar = true;

  }
  startVoice() {
    this.PlatForm.ready().then(() => {
      this.speechRecognition.requestPermission().then(
        async () => {
          await this.startVoiceRecord();
          this.search.setFocus();
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
}
