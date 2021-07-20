import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopuplogoutComponent } from './popuplogout.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [
      PopuplogoutComponent
    ],
    imports: [
      CommonModule,
      IonicModule
    ],
    exports: [
      PopuplogoutComponent
    ]
  })
  export class PopuplogoutModule { }