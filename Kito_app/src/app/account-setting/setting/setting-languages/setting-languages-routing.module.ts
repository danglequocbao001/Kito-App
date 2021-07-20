import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingLanguagesPage } from './setting-languages.page';

const routes: Routes = [
  {
    path: '',
    component: SettingLanguagesPage
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingLanguagesPageRoutingModule {}
