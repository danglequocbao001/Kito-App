import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeAvatarPageRoutingModule } from './change-avatar-routing.module';

import { ChangeAvatarPage } from './change-avatar.page';
import { HeaderModule } from 'src/app/@modular/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeAvatarPageRoutingModule,
    HeaderModule
  ],
  declarations: [ChangeAvatarPage]
})
export class ChangeAvatarPageModule {}
