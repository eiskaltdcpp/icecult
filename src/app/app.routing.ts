import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HubListComponent } from './hubs';

const appRoutes: Routes = [
  { path: '', redirectTo: '/hubs', pathMatch: 'full'},
  { path: 'hubs', component: HubListComponent },
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
