import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParishesPage } from './parishes.page';

const routes: Routes = [
  {
    path: '',
    component: ParishesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParishesPageRoutingModule {}
