import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiocesesPage } from './dioceses.page';

const routes: Routes = [
  {
    path: '',
    component: DiocesesPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiocesesPageRoutingModule {}
