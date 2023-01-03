import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./pages/forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'pit-info',
    loadChildren: () => import('./pages/pit-info/pit-info.module').then( m => m.PitInfoPageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./pages/events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./pages/calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'event-info',
    loadChildren: () => import('./pages/event-info/event-info.module').then( m => m.EventInfoPageModule)
  },
  {
    path: 'weather',
    loadChildren: () => import('./pages/weather/weather.module').then( m => m.WeatherPageModule)
  },
  {
    path: 'time-selector',
    loadChildren: () => import('./pages/time-selector/time-selector.module').then( m => m.TimeSelectorPageModule)
  },
  {
    path: 'location-selection',
    loadChildren: () => import('./pages/location-selection/location-selection.module').then( m => m.LocationSelectionPageModule)
  },
  {
    path: 'map-position-selector',
    loadChildren: () => import('./pages/map-position-selector/map-position-selector.module').then( m => m.MapPositionSelectorPageModule)
  },
  {
    path: 'preferences-selector',
    loadChildren: () => import('./pages/preferences-selector/preferences-selector.module').then( m => m.PreferencesSelectorPageModule)
  },
  {
    path: 'other-preferences-selector',
    loadChildren: () => import('./pages/other-preferences-selector/other-preferences-selector.module').then( m => m.OtherPreferencesSelectorPageModule)
  },
  {
    path: 'profile-selector',
    loadChildren: () => import('./pages/profile-selector/profile-selector.module').then( m => m.ProfileSelectorPageModule)
  },
  {
    path: 'routes',
    loadChildren: () => import('./pages/routes/routes.module').then( m => m.RoutesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
