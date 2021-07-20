import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatechismMarriagePageRoutingModule } from './catechism-marriage-routing.module';

import { CatechismMarriagePage } from './catechism-marriage.page';
import { HeaderModule } from 'src/app/@modular/header/header.module';
import { SearchBarNavModule } from 'src/app/@modular/search-bar-nav/search-bar-nav.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatechismMarriagePageRoutingModule,
    HeaderModule,
    SearchBarNavModule
  ],
  declarations: [CatechismMarriagePage]
})
export class CatechismMarriagePageModule {}
