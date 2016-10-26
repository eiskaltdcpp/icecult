import { Component, Input } from '@angular/core';

import { Hub } from '../shared';


@Component({
  selector: 'ice-hub',
  templateUrl: './hub.component.html',
})
export class HubComponent {
  @Input() hub: Hub;
}
