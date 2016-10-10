import { Component, Input, OnInit } from '@angular/core';
import { LocalStorage } from 'angular2-localstorage';
import { List } from 'immutable';

import { ApiService, Hub, Message } from '../shared';


@Component({
  selector: 'ice-hub',
  providers: [ApiService],
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent implements OnInit {
  @Input() hub: Hub;
  @LocalStorage() messages: Object = {};

  constructor(private api: ApiService) {}

  ngOnInit() {
    // this.messages = LocalStorage({ storageKey: `chatlog_${this.hub.name}` })(this.messages);
    if (!this.messages.hasOwnProperty(this.hub.name)) {
      this.messages[this.hub.name] = new Array<Message>();
    }
    this.api.hubChat(this.hub).subscribe(msg => {
      this.messages[this.hub.name].push(msg);
    });
  }
}
