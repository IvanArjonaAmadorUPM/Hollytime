import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PitInfoPageRoutingModule } from './pit-info-routing.module';

import { PitInfoPage } from './pit-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PitInfoPageRoutingModule
  ],
  declarations: [PitInfoPage]
})
export class PitInfoPageModule {}
