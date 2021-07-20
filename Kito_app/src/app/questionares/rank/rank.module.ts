import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RankPageRoutingModule } from './rank-routing.module';

import { RankPage } from './rank.page';
import { HeaderModule } from 'src/app/@modular/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RankPageRoutingModule,
    HeaderModule
  ],
  declarations: [RankPage]
})
export class RankPageModule {}
