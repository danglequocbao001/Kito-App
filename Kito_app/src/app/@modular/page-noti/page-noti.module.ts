import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PageNotiRoutingModule } from './page-noti-routing.module';
import { PageNotiComponent } from './page-noti.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageNotiRoutingModule
  ],
  declarations: [PageNotiComponent],
  exports: [PageNotiComponent],
})
export class PageNotiModule { }
