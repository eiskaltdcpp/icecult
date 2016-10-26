import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { List } from 'immutable';

import { ApiService, Hub } from './shared';


@Component({
  selector: 'ice-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent implements OnInit {
  private version$: Observable<String>;
  private hubs$: Observable<List<Hub>>;
  private currentHub: Hub;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.version$ = this.api.showVersion();
    this.hubs$ = this.api.getHubs();
    this.hubs$.subscribe(hubs => this.currentHub = hubs.first());
  }
}
