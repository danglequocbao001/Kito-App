import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarDetailPageRoutingModule } from './calendar-detail-routing.module';

import { CalendarDetailPage } from './calendar-detail.page';
import { HeaderModule } from '../header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarDetailPageRoutingModule,
    HeaderModule
  ],
  declarations: [CalendarDetailPage]
})
export class CalendarDetailPageModule {}
