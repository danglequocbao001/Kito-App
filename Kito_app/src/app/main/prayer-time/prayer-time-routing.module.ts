import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrayerTimePage } from './prayer-time.page';

const routes: Routes = [
  {
    path: '',
    component: PrayerTimePage
  },
  {
    path: 'prayer-detail',
    loadChildren: () => import('./prayer-detail/prayer-detail.module').then( m => m.PrayerDetailPageModule)
  },  {
    path: 'select-diocese',
    loadChildren: () => import('./select-diocese/select-diocese.module').then( m => m.SelectDiocesePageModule)
  },
  {
    path: 'select-parish',
    loadChildren: () => import('./select-parish/select-parish.module').then( m => m.SelectParishPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrayerTimePageRoutingModule {}
