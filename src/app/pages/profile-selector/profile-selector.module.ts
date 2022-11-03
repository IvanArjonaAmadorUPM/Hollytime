import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileSelectorPageRoutingModule } from './profile-selector-routing.module';

import { ProfileSelectorPage } from './profile-selector.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileSelectorPageRoutingModule
  ],
  declarations: [ProfileSelectorPage]
})
export class ProfileSelectorPageModule {}
