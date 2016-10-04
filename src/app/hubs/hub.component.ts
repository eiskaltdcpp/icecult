import { Component, Input } from '@angular/core';

import { ApiService, Hub} from '../shared';


@Component({
  selector: 'ice-hub',
  providers: [ApiService],
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent {
  @Input() hub: Hub;
}
