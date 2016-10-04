import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdButtonModule } from '@angular2-material/button';
import { MdIconModule } from '@angular2-material/icon';
import { MdTabsModule } from '@angular2-material/tabs';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdTooltipModule } from '@angular2-material/tooltip';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HubListComponent, HubComponent } from './hubs';


@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, HubListComponent, HubComponent],
  imports: [
    routing,
    BrowserModule,
    MdButtonModule.forRoot(),
    MdTabsModule.forRoot(),
    MdIconModule.forRoot(),
    MdToolbarModule.forRoot(),
    MdTooltipModule.forRoot()
  ]
})
export class AppModule {}
