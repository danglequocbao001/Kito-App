import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionaresPage } from './questionares.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionaresPage
  },
  {
    path: 'choose-question',
    loadChildren: () => import('./choose-question/choose-question.module').then( m => m.ChooseQuestionPageModule)
  },  {
    path: 'question',
    loadChildren: () => import('./question/question.module').then( m => m.QuestionPageModule)
  },
  {
    path: 'complete-question',
    loadChildren: () => import('./complete-question/complete-question.module').then( m => m.CompleteQuestionPageModule)
  },
  {
    path: 'rule',
    loadChildren: () => import('./rule/rule.module').then( m => m.RulePageModule)
  },
  {
    path: 'rank',
    loadChildren: () => import('./rank/rank.module').then( m => m.RankPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionaresPageRoutingModule {}
