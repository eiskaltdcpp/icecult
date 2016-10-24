import { Injectable } from '@angular/core';
import { List, Map } from 'immutable';
import * as Immutable from 'immutable';

import { config } from '../../config';
import { Hub, Message, hashCode } from '..';


@Injectable()
export class StorageService {

  constructor() {
    let storedVersion = localStorage.getItem('version');
    if (storedVersion === undefined || Number(storedVersion) < config.storage.version) {
      // set default data (resetting old data on schema version change)
      localStorage.clear();
      localStorage.setItem('version', String(config.storage.version));
      this.set('messages', Immutable.Map<String, List<Message>>());
    }
  }

  private set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  private get(key) {
    return Immutable.fromJS(JSON.parse(localStorage.getItem(key)));
  }

  private hubHash(hub: Hub): String {
    return String(hashCode(hub.url));
  }

  public messages(hub: Hub): List<Message> {
    let hubHash = this.hubHash(hub);
    let hubMap: Map<String, List<Map<string, any>>> = this.get('messages');
    let oldMessages = hubMap.has(hubHash) ? hubMap.get(hubHash) : Immutable.List<Map<string, any>>();
    return oldMessages.map(msg => (msg.toObject() as Message)).toList();
  }

  public combinedMessages(hub: Hub, newMessage: Message): List<Message> {
    return this.set('messages', this.get('messages').set(
      this.hubHash(hub),
      this.messages(hub).push(newMessage)
    ));
  }
}
