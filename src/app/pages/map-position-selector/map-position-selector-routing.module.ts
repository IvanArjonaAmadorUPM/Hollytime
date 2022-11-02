import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapPositionSelectorPage } from './map-position-selector.page';

const routes: Routes = [
  {
    path: '',
    component: MapPositionSelectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapPositionSelectorPageRoutingModule {}
