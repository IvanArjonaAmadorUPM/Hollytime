import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventInfoPageRoutingModule } from './event-info-routing.module';

import { EventInfoPage } from './event-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventInfoPageRoutingModule
  ],
  declarations: [EventInfoPage]
})
export class EventInfoPageModule {}
