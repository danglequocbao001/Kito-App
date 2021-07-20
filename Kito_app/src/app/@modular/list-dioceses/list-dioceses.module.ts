import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDiocesesComponent } from './list-dioceses.component';
import { ListDiocesesRoutingModule } from './list-dioceses-routing.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ListDiocesesComponent],
  imports: [
    CommonModule,
    ListDiocesesRoutingModule,
    IonicModule
  ],
  exports: [
    ListDiocesesComponent
  ]
})
export class ListDiocesesModule { }
