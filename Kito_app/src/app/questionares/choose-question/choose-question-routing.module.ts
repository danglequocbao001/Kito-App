import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChooseQuestionDetailComponent } from './choose-question-detail/choose-question-detail.component';

import { ChooseQuestionPage } from './choose-question.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseQuestionPage
  },
  {
    path: 'detail',
    component: ChooseQuestionDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseQuestionPageRoutingModule { }
