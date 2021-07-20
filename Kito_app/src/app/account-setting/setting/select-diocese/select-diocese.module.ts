import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectDiocesePageRoutingModule } from './select-diocese-routing.module';

import { SelectDiocesePage } from './select-diocese.page';
import { HeaderModule } from 'src/app/@modular/header/header.module';
import { SearchBarNavModule } from 'src/app/@modular/search-bar-nav/search-bar-nav.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectDiocesePageRoutingModule,
    HeaderModule,
    SearchBarNavModule
  ],
  declarations: [SelectDiocesePage]
})
export class SelectDiocesePageModule {}
