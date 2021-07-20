import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatechismPage } from './catechism.page';

const routes: Routes = [
  {
    path: '',
    component: CatechismPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatechismPageRoutingModule {}
