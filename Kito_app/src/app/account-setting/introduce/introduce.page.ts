import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.page.html',
  styleUrls: ['./introduce.page.scss'],
})
export class IntroducePage implements OnInit {
  isShowLicense = false;
  constructor() { }
  headerCustom = { title: 'Giới thiệu' };
  ngOnInit() {
  }
  showLicense() {
    if(this.isShowLicense == false) {
      this.isShowLicense = true;
    } else this.isShowLicense = false;
  }

}
