import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyParishPageRoutingModule } from './my-parish-routing.module';

import { MyParishPage } from './my-parish.page';
import { HeaderModule } from 'src/app/@modular/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    MyParishPageRoutingModule
  ],
  declarations: [MyParishPage]
})
export class MyParishPageModule {}
