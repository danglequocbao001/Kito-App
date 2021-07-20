import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectParishPageRoutingModule } from './select-parish-routing.module';

import { SelectParishPage } from './select-parish.page';
import { HeaderModule } from 'src/app/@modular/header/header.module';
import { SearchBarNavModule } from 'src/app/@modular/search-bar-nav/search-bar-nav.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectParishPageRoutingModule,
    HeaderModule,
    SearchBarNavModule
  ],
  declarations: [SelectParishPage]
})
export class SelectParishPageModule {}
