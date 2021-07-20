import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionaresPageRoutingModule } from './questionares-routing.module';

import { QuestionaresPage } from './questionares.page';
import { HeaderModule } from '../@modular/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionaresPageRoutingModule,
    HeaderModule
  ],
  declarations: [QuestionaresPage]
})
export class QuestionaresPageModule {}
