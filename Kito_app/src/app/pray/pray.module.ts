import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { PrayPageRoutingModule } from './pray-routing.module';

import { PrayPage } from './pray.page';
import { HeaderModule } from '../@modular/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    ReactiveFormsModule,
    PrayPageRoutingModule
  ],
  declarations: [PrayPage]
})
export class PrayPageModule {}
