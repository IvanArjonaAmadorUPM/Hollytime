import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapPositionSelectorPageRoutingModule } from './map-position-selector-routing.module';

import { MapPositionSelectorPage } from './map-position-selector.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPositionSelectorPageRoutingModule
  ],
  declarations: [MapPositionSelectorPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class MapPositionSelectorPageModule {}
