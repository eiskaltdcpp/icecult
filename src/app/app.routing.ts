import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HubListComponent } from './hubs';
import { AboutComponent } from './about';

const appRoutes: Routes = [
  { path: '', redirectTo: '/hubs', pathMatch: 'full'},
  { path: 'hubs', component: HubListComponent },
  { path: 'about', component: AboutComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
