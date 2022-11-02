import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreferencesSelectorPageRoutingModule } from './preferences-selector-routing.module';

import { PreferencesSelectorPage } from './preferences-selector.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreferencesSelectorPageRoutingModule
  ],
  declarations: [PreferencesSelectorPage]
})
export class PreferencesSelectorPageModule {}
