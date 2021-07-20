import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyParishPage } from './my-parish.page';

const routes: Routes = [
  {
    path: '',
    component: MyParishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyParishPageRoutingModule {}
