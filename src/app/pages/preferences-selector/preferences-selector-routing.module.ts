import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreferencesSelectorPage } from './preferences-selector.page';

const routes: Routes = [
  {
    path: '',
    component: PreferencesSelectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreferencesSelectorPageRoutingModule {}
