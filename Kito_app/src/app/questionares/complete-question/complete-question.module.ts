import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteQuestionPageRoutingModule } from './complete-question-routing.module';

import { CompleteQuestionPage } from './complete-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteQuestionPageRoutingModule
  ],
  declarations: [CompleteQuestionPage]
})
export class CompleteQuestionPageModule {}
