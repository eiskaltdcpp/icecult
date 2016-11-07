import { Component, OnInit, Input } from '@angular/core';

import { Hub } from '../shared';


@Component({
  selector: 'ice-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  @Input() hub: Hub;

  constructor() { }

  ngOnInit() { }
}
