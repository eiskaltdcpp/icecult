import { AppComponent } from './app.component';
import { ApiService } from './shared/services/api.service';
import { StorageService } from './shared/services/storage.service';
import { ChatComponent } from './chat/chat.component';
import { HubComponent } from './hub/hub.component';
import { NumeralPipe } from './shared/pipes/numeral.pipe';
import { UserListComponent } from './user/user-list.component';
import { MaxHeightDirective } from './chat/max-height.component';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    ChatComponent,
    HubComponent,
    UserListComponent,
    MaxHeightDirective,
    NumeralPipe,
  ],
  imports: [
    BrowserModule,
    MaterialModule.forRoot()
  ],
  providers: [
    ApiService,
    StorageService,
  ]
})
export class AppModule { }
