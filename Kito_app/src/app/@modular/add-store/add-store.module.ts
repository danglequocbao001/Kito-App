import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AddStoreComponent } from './add-store.component';



@NgModule({
  declarations: [AddStoreComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [AddStoreComponent]
})
export class AddStoreModule { }
