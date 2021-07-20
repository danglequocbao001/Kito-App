import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainItemComponent } from './main-item.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [MainItemComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    MainItemComponent
  ]
})
export class MainItemModule { }
