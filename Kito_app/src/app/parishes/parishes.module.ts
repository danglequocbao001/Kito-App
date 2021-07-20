import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParishesPageRoutingModule } from './parishes-routing.module';

import { ParishesPage } from './parishes.page';
import { HeaderModule } from '../@modular/header/header.module';
import { SearchBarNavModule } from '../@modular/search-bar-nav/search-bar-nav.module';
import { ListDiocesesModule } from '../@modular/list-dioceses/list-dioceses.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    SearchBarNavModule,
    ListDiocesesModule,
    IonicModule,
    ParishesPageRoutingModule
  ],
  declarations: [ParishesPage]
})
export class ParishesPageModule {}
