import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RouteInfoPageRoutingModule } from './route-info-routing.module';

import { RouteInfoPage } from './route-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouteInfoPageRoutingModule
  ],
  declarations: [RouteInfoPage]
})
export class RouteInfoPageModule {}
