import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentPageRoutingModule } from './comment-routing.module';

import { CommentPage } from './comment.page';
import { HeaderModule } from '../../@modular/header/header.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentPageRoutingModule,
    HeaderModule
  ],
  declarations: [CommentPage]
})
export class CommentPageModule {}
