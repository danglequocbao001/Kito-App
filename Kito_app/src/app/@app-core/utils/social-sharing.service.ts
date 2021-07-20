import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Injectable()
export class SocialSharingService {
    constructor(
        public PlatForm: Platform,
        public socialSharing: SocialSharing,
    ) { }
    share() {
        this.socialSharing.shareWithOptions({
            chooserTitle: 'Chia sẻ ứng dụng',
            url: 'https://play.google.com/store/apps/details?id=com.conggiaovn.patitek'
        }).then((data) => {
            console.log(data)
        }).catch((err) => { })
    }
}