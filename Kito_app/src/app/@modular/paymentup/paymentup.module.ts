import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentupComponent } from './paymentup.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [
      PaymentupComponent
    ],
    imports: [
      CommonModule,
      IonicModule
    ],
    exports: [
      PaymentupComponent
    ]
  })
  export class PaymentupModule { }