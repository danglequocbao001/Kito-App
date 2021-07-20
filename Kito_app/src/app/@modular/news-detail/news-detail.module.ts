import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsDetailPageRoutingModule } from './news-detail-routing.module';

import { NewsDetailPage } from './news-detail.page';
import { HeaderModule } from '../header/header.module';
import { SearchBarNavModule } from '../search-bar-nav/search-bar-nav.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsDetailPageRoutingModule,
    HeaderModule,
    SearchBarNavModule
  ],
  declarations: [
    NewsDetailPage,
  ]
})
export class NewsDetailPageModule { }
