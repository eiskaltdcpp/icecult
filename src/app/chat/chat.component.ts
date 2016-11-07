import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MdInput } from '@angular/material';

import { ApiService, Hub } from '../shared';
import { hashCode, int2RGB } from '../shared/util';


@Component({
  selector: 'ice-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() hub: Hub;
  @ViewChild('chat') chat: ElementRef;
  @ViewChild('chatInput') input: MdInput;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.input.focus();
    // scroll down initially and on new messages
    // this.scrollDown();
    this.hub.messages$.subscribe(msgs => setTimeout(() => this.scrollDown(), 1));
  }

  colorOfNick(nickname) {
    return '#' + int2RGB(hashCode(nickname));
  }

  send() {
    if (this.input.value.trim()) {
      this.api.sendMessage(this.hub, this.input.value.trim());
      this.input.value = '';
    }
  }

  scrollDown(): void {
    console.log(
      this.chat.nativeElement.scrollTop,
      this.chat.nativeElement.scrollDown,
      this.chat.nativeElement.scrollHeight,
      this.chat.nativeElement.scroll
    );
    this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
  }
}
