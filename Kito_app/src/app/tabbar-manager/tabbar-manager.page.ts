import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabbar-manager',
  templateUrl: './tabbar-manager.page.html',
  styleUrls: ['./tabbar-manager.page.scss'],
})
export class TabbarManagerPage implements OnInit {
  footerList = [
    {
      id: 0,
      active: true,
      title: 'Trang chủ',
      tab: 'main',
      imgSrc: 'assets/icon/tab/main.svg',
    },
    {
      id: 1,
      active: false,
      tab: 'social',
      imgSrc: 'assets/icon/tab/social.svg',
      title: 'Cộng đồng'
    },
    {
      id: 2,
      active: false,
      tab: 'personal',
      imgSrc: 'assets/icon/tab/personal.svg',
      title: 'Cá nhân'
    },

  ]
  constructor() { }

  ionTabsDidChange() {
  }
  setCurrentTab(item) {
    this.footerList.forEach(element => {
      element.active = false;
    });
    item.active = true;
  }
  ngOnInit() {
  }

}
