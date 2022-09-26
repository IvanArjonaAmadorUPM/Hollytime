import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventComponent } from 'src/app/components/event/event.component';

import { EventsPage } from './events.page';

const routes: Routes = [
  {
    path: '',
    component: EventsPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    
  ],
  exports: [RouterModule],
})
export class EventsPageRoutingModule {}
