import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseQuestionPageRoutingModule } from './choose-question-routing.module';

import { ChooseQuestionPage } from './choose-question.page';
import { HeaderModule } from 'src/app/@modular/header/header.module';
import { ChooseQuestionDetailComponent } from './choose-question-detail/choose-question-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseQuestionPageRoutingModule,
    HeaderModule
  ],
  declarations: [ChooseQuestionPage, ChooseQuestionDetailComponent]
})
export class ChooseQuestionPageModule { }
