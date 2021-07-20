import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatechismClassPage } from './catechism-class.page';

const routes: Routes = [
  {
    path: '',
    component: CatechismClassPage
  },
  {
    path: 'catechism',
    loadChildren: () => import('./catechism/catechism.module').then( m => m.CatechismPageModule)
  },
  {
    path: 'catechism-marriage',
    loadChildren: () => import('./catechism-marriage/catechism-marriage.module').then( m => m.CatechismMarriagePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatechismClassPageRoutingModule {}
