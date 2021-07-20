import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BibleSongDetailComponent } from './bible-song-detail/bible-song-detail.component';

import { HymnVideoPage } from './hymn-video.page';

const routes: Routes = [
  {
    path: '',
    component: HymnVideoPage
  },
  {
    path: 'BibleSongdetail/:id',
    component: BibleSongDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HymnVideoPageRoutingModule { }
