import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDonateComponent } from './modal-donate.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [
      ModalDonateComponent
    ],
    imports: [
      CommonModule,
      IonicModule
    ],
    exports: [
      ModalDonateComponent
    ]
  })
  export class ModalDonateModule { }