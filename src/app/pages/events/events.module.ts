import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsPageRoutingModule } from './events-routing.module';
import { EventsPage } from './events.page';
import {EventComponent} from '../../components/event/event.component'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsPageRoutingModule,
    
  ],
  exports:[EventsPage],
  declarations: [EventsPage,EventComponent],
})
export class EventsPageModule {}
