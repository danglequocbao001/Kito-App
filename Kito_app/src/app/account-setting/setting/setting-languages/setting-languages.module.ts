import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingLanguagesPageRoutingModule } from './setting-languages-routing.module';

import { SettingLanguagesPage } from './setting-languages.page';
import { HeaderModule } from 'src/app/@modular/header/header.module';
import { SearchBarNavModule } from 'src/app/@modular/search-bar-nav/search-bar-nav.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingLanguagesPageRoutingModule,
    HeaderModule,
    SearchBarNavModule
  ],
  declarations: [
    SettingLanguagesPage,
  ]
})
export class SettingLanguagesPageModule {}
