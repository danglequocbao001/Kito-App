import { HeaderModule } from './../../@modular/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersHistoryPageRoutingModule } from './orders-history-routing.module';

import { OrdersHistoryPage } from './orders-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersHistoryPageRoutingModule,
    HeaderModule
  ],
  declarations: [OrdersHistoryPage]
})
export class OrdersHistoryPageModule {}
