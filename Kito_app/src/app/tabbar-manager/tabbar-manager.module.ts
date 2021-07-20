import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabbarManagerPageRoutingModule } from './tabbar-manager-routing.module';

import { TabbarManagerPage } from './tabbar-manager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabbarManagerPageRoutingModule
  ],
  declarations: [TabbarManagerPage]
})
export class TabbarManagerPageModule {}
