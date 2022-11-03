import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherPreferencesSelectorPageRoutingModule } from './other-preferences-selector-routing.module';

import { OtherPreferencesSelectorPage } from './other-preferences-selector.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherPreferencesSelectorPageRoutingModule
  ],
  declarations: [OtherPreferencesSelectorPage]
})
export class OtherPreferencesSelectorPageModule {}
