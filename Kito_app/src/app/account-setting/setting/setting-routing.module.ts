import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingPage } from './setting.page';

const routes: Routes = [
  {
    path: '',
    component: SettingPage
  },
  {
    path: 'setting-languages',
    loadChildren: () => import('./setting-languages/setting-languages.module').then( m => m.SettingLanguagesPageModule)
  },
  {
    path: 'select-diocese',
    loadChildren: () => import('./select-diocese/select-diocese.module').then( m => m.SelectDiocesePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingPageRoutingModule {}
