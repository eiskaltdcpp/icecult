import { Component, Input } from '@angular/core';

import { Hub } from '../shared';


@Component({
  selector: 'ice-hub',
  providers: [],
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent {
  @Input() hub: Hub;
}
