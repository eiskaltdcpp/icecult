import { ApiService } from './shared';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ice-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent implements OnInit{
  private version: String;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.showVersion().subscribe((version: String) => this.version = version);
  }
}
