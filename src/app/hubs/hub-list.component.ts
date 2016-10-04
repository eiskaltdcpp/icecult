import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { List } from 'immutable';

import { ApiService, Hub } from '../shared';


@Component({
  selector: 'ice-hub-list',
  providers: [ApiService],
  templateUrl: './hub-list.component.html',
  styleUrls: ['./hub-list.component.css']
})
export class HubListComponent implements OnInit {
  private hubs: Observable<List<Hub>>;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.hubs = this.api.getHubs();
  }

}
