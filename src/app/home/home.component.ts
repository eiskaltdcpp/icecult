import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ice-home',
  template: require('./home.component.html'),
  // styles: [require('./home.component.scss')]
})
export class HomeComponent implements OnInit {

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello Home');
  }

}
