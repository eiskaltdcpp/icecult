import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdButtonModule } from '@angular2-material/button';
import { MdIconModule } from '@angular2-material/icon';
import { MdTabsModule } from '@angular2-material/tabs';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HubListComponent } from './hubs';
import { AboutComponent } from './about';


@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, HubListComponent, AboutComponent],
  imports: [
    routing,
    BrowserModule,
    MdButtonModule.forRoot(),
    MdTabsModule.forRoot(),
    MdIconModule.forRoot(),
  ],
  providers: [],
})
export class AppModule {}
