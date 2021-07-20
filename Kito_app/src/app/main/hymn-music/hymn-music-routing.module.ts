import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HymnMusicPage } from './hymn-music.page';

const routes: Routes = [
  {
    path: '',
    component: HymnMusicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HymnMusicPageRoutingModule {}
