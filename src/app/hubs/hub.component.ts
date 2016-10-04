import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { List } from 'immutable';

import { ApiService, Hub, User} from '../shared';


@Component({
  selector: 'ice-hub',
  providers: [ApiService],
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent implements OnInit {
  @Input() hub: Hub;
  users$: Observable<List<User>>;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.users$ = this.api.hubUsers(this.hub);
  }

}
