import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseStorePage } from './choose-store.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseStorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseStorePageRoutingModule {}
