import { Component, Input } from '@angular/core';

import { Hub } from '../shared';
import { hashCode, int2RGB } from '../shared/util';

@Component({
  selector: 'ice-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent {
  @Input() hub: Hub;

  constructor() { }

  colorOfNick(nickname) {
    return '#' + int2RGB(hashCode(nickname));
  }
}
