import { Component } from '@angular/core';

@Component({
  selector: 'ice-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  url = 'https://github.com/preboot/angular2-webpack';

  constructor() {
  }
}
