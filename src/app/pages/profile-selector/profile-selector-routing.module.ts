import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileSelectorPage } from './profile-selector.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileSelectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileSelectorPageRoutingModule {}
