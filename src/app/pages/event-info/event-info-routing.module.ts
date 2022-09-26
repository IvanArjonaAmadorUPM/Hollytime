import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventInfoPage } from './event-info.page';

const routes: Routes = [
  {
    path: '',
    component: EventInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventInfoPageRoutingModule {}
