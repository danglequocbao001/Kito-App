import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroducePageRoutingModule } from './introduce-routing.module';

import { IntroducePage } from './introduce.page';
import { HeaderModule } from 'src/app/@modular/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroducePageRoutingModule,
    HeaderModule
  ],
  declarations: [IntroducePage]
})
export class IntroducePageModule {}
