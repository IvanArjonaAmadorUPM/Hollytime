import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PitInfoPage } from './pit-info.page';

const routes: Routes = [
  {
    path: '',
    component: PitInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PitInfoPageRoutingModule {}
