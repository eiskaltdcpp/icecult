import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ice-about',
  template: require('./about.component.html'),
  // styles: [require('./about.component.scss')],
})
export class AboutComponent implements OnInit {

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello About');
  }

}
