import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsPageRoutingModule } from './news-routing.module';

import { NewsPage } from './news.page';
import { HeaderModule } from '../header/header.module';
import { SearchBarNavModule } from '../search-bar-nav/search-bar-nav.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsPageRoutingModule,
    HeaderModule,
    SearchBarNavModule,
  ],
  declarations: [NewsPage]
})
export class NewsPageModule {}
