import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatechismClassPageRoutingModule } from './catechism-class-routing.module';

import { CatechismClassPage } from './catechism-class.page';
import { HeaderModule } from 'src/app/@modular/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatechismClassPageRoutingModule,
    HeaderModule
  ],
  declarations: [
    CatechismClassPage,
  ]
})
export class CatechismClassPageModule {}
