import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArchdioceseDetailPage } from './archdiocese-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ArchdioceseDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArchdioceseDetailPageRoutingModule {}
