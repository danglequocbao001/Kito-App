import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainSlideRoutingModule } from './main-slide-routing.module';
import { MainSlideComponent } from './main-slide.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [MainSlideComponent],
  imports: [
    CommonModule,
    MainSlideRoutingModule,
    IonicModule
  ],
  exports: [
    MainSlideComponent
  ]
})
export class MainSlideModule { }
