import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeSelectorPage } from './time-selector.page';

const routes: Routes = [
  {
    path: '',
    component: TimeSelectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeSelectorPageRoutingModule {}
