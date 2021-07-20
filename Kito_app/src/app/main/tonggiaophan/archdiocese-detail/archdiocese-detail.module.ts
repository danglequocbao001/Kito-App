import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArchdioceseDetailPageRoutingModule } from './archdiocese-detail-routing.module';

import { ArchdioceseDetailPage } from './archdiocese-detail.page';
import { HeaderModule } from 'src/app/@modular/header/header.module';
import { MainSlideModule } from 'src/app/@modular/main-slide/main-slide.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArchdioceseDetailPageRoutingModule,
    HeaderModule,
    MainSlideModule
  ],
  declarations: [ArchdioceseDetailPage]
})
export class ArchdioceseDetailPageModule { }
