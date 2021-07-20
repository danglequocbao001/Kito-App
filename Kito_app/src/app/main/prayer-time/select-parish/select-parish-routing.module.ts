import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectParishPage } from './select-parish.page';

const routes: Routes = [
  {
    path: '',
    component: SelectParishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectParishPageRoutingModule {}
