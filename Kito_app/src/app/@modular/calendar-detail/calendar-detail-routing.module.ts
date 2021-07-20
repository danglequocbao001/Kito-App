import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarDetailPage } from './calendar-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarDetailPageRoutingModule {}
