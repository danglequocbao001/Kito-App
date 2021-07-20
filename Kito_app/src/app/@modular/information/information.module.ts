import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformationPageRoutingModule } from './information-routing.module';

import { InformationPage } from './information.page';
import { HeaderModule } from '../header/header.module';
import { SearchBarNavModule } from '../search-bar-nav/search-bar-nav.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformationPageRoutingModule,
    HeaderModule,
    SearchBarNavModule
  ],
  declarations: [InformationPage]
})
export class InformationPageModule {}
