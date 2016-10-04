import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiService } from './shared';


@Component({
  selector: 'ice-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent implements OnInit{
  private version$: Observable<String>;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.version$ = this.api.showVersion();
  }
}
