import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectDiocesePage } from './select-diocese.page';

const routes: Routes = [
  {
    path: '',
    component: SelectDiocesePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectDiocesePageRoutingModule {}
