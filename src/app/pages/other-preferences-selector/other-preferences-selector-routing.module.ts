import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherPreferencesSelectorPage } from './other-preferences-selector.page';

const routes: Routes = [
  {
    path: '',
    component: OtherPreferencesSelectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherPreferencesSelectorPageRoutingModule {}
