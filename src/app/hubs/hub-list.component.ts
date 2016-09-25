import { ApiService } from '../shared';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ice-hub-list',
  providers: [ApiService],
  templateUrl: './hub-list.component.html',
  styleUrls: ['./hub-list.component.css']
})
export class HubListComponent implements OnInit {

  constructor(
    private api: ApiService
  ) {}

  ngOnInit() {
    console.log(this.api.title);
  }

}
