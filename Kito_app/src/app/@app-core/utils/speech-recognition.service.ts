import { Injectable } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Platform } from '@ionic/angular';
import { AuthService } from '../http';
@Injectable()
export class SpeechRecognitionService {
    public voiceResult = '';
    constructor(
        public speechRecognition: SpeechRecognition,
        public PlatForm: Platform,
        public authService: AuthService,
    ) { }

    checkPermission() {
        this.PlatForm.ready().then(() => {
            this.speechRecognition.requestPermission().then(
                () => this.startVoiceRecord())
        })
    }
    startVoiceRecord() {
        if (localStorage.getItem('voice')) {
            localStorage.removeItem('voice');
        }
        this.speechRecognition.startListening().subscribe((matches: Array<string>) => {
            this.voiceResult = matches[0];
            localStorage.setItem('voice', this.voiceResult)
        })
    }
}