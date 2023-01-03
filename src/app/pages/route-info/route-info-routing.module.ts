import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteInfoPage } from './route-info.page';

const routes: Routes = [
  {
    path: '',
    component: RouteInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RouteInfoPageRoutingModule {}
