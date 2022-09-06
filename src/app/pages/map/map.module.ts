import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapPageRoutingModule } from './map-routing.module';

import { MapPage } from './map.page';
import {MapsComponent} from '../../components/maps/maps.component'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPageRoutingModule,
    ],
  declarations: [MapPage,MapsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MapPageModule {}
