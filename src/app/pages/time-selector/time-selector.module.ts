import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimeSelectorPageRoutingModule } from './time-selector-routing.module';

import { TimeSelectorPage } from './time-selector.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeSelectorPageRoutingModule
  ],
  declarations: [TimeSelectorPage]
})
export class TimeSelectorPageModule {}
