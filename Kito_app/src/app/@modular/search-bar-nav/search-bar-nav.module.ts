import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarNavComponent } from './search-bar-nav.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    SearchBarNavComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    SearchBarNavComponent
  ],
})
export class SearchBarNavModule { }
