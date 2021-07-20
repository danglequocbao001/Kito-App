import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-languages',
  templateUrl: './setting-languages.page.html',
  styleUrls: ['./setting-languages.page.scss'],
})
export class SettingLanguagesPage implements OnInit {
  headerCustom = { title: 'Ngôn ngữ' };
  languages = [
    { name: 'Tiếng Việt', id: 0 },
    { name: 'English', id: 1 },
  ];
  selectedLanguage = { name: 'Việt Nam', id: 0 };

  constructor() { }

  ngOnInit() {
    this.getLanguage();
  }

  getLanguage() {
    this.selectedLanguage = JSON.parse(localStorage.getItem('language')) || { name: 'Việt Nam', id: 0 };
  }

  setLanguage(language) {
    localStorage.setItem('language', JSON.stringify(language));
  }
}
