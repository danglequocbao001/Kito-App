import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteQuestionPage } from './complete-question.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteQuestionPageRoutingModule {}
