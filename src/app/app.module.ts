import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HomeComponent } from './home';
import { AboutComponent } from './about';


@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, HomeComponent, AboutComponent],
  imports: [BrowserModule, routing],
  providers: [],
})
export class AppModule {}
