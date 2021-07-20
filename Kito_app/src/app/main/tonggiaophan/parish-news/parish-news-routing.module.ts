import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParishNewsPage } from './parish-news.page';

const routes: Routes = [
  {
    path: '',
    component: ParishNewsPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParishNewsPageRoutingModule {}
