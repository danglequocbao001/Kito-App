import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentmethodsPageRoutingModule } from './paymentmethods-routing.module';

import { PaymentmethodsPage } from './paymentmethods.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HeaderComponent } from '../@modular/header/header.component';
import { HeaderModule } from '../@modular/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    PaymentmethodsPageRoutingModule
  ],
  providers: [
    InAppBrowser
  ],
  declarations: [PaymentmethodsPage],

})
export class PaymentmethodsPageModule {}
