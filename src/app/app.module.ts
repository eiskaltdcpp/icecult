import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HubComponent } from './hub';
import { ChatComponent } from './chat';
import { ApiService } from './shared/services/api.service';
import { StorageService } from './shared/services/storage.service';


@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, HubComponent, ChatComponent],
  imports: [
    BrowserModule,
    MaterialModule.forRoot()
  ],
  providers: [
    StorageService,
    ApiService
  ]
})
export class AppModule {}
