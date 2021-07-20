import { HeaderModule } from './../../@modular/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RulePageRoutingModule } from './rule-routing.module';

import { RulePage } from './rule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RulePageRoutingModule,
    HeaderModule
  ],
  declarations: [RulePage]
})
export class RulePageModule {}
