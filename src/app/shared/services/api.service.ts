import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { List } from 'immutable';
import * as Immutable from 'immutable';

import { config } from '../../config';
import { Hub, User, Message } from '..';
import { StorageService } from '../services/storage.service';


@Injectable()
export class ApiService {
  private DEFAULT_SEPARATOR: String = '┴';

  constructor(
    private http: Http,
    private storage: StorageService
  ) { }

  private jsonRPC(method: String, parameters?: any, isSeperatedList?: Boolean): Observable<any> {
    return this.http.request(new Request(new RequestOptions({
      url: '/rpc/?' + method,
      method: RequestMethod.Post,
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        'jsonrpc': '2.0',
        'method': method,
        'params': parameters,
        'id': 1
      }),
    }))).map((res: Response) => {
      let result = res.json().result;
      if (isSeperatedList) {
        if (result.length === 0) {
          return [];
        } else {
          // kill trailing separators
          const re = new RegExp(parameters.separator + '+$', 'g');
          result = result.replace(re, '');
          // split by separator
          result = result.split(parameters.separator);
        }
      }
      return result;
    })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  showVersion(): Observable<String> {
    return this.jsonRPC('show.version');
  }

  getHubs(): Observable<List<Hub>> {
    return Observable.interval(config.api.hubs).startWith(0)
      .concatMap(() => this.jsonRPC('hub.listfulldesc'))
      // convert to immutable
      .map(result => List(Object.keys(result).map(key => {
        let hub = new Hub();
        hub.url = key;
        hub.name = result[key].hubname;
        hub.description = result[key].description;
        hub.share = result[key].totalshare;
        return hub;
      })))
      // on
      .distinctUntilChanged(Immutable.is)
      .map((hubs: List<Hub>) => hubs.map(hub => {
        hub.users$ = this.hubUsers(hub);
        hub.messages$ = this.hubMessages(hub);
        return hub;
      }))
      .map(hubs => <List<Hub>>hubs.sortBy(hub => hub.name))
      .distinctUntilChanged(Immutable.is);
  }

  hubUsers(hub: Hub): Observable<List<User>> {
    return Observable.interval(config.api.users).startWith(0)
      .concatMap(() => this.jsonRPC('hub.getusers', { huburl: hub.url, separator: this.DEFAULT_SEPARATOR }, true))
      .concatMap((nicks: String[]) => {
        let users$ = nicks.map(nick => this.jsonRPC('hub.getuserinfo', { nick: nick, huburl: hub.url }).map(userInfo => {
          let user = new User();
          user.cid = userInfo.CID;
          user.connection = userInfo.Connection;
          user.description = userInfo.Description;
          user.ip = userInfo.IP;
          user.icon = userInfo.Icon;
          user.nick = userInfo.Nick;
          user.nickOrder = userInfo['Nick Order'];
          user.shared = userInfo.Shared;
          user.tag = userInfo.Tag;
          user.email = userInfo.eMail;
          return user;
        }));
        return Observable.merge(...users$).toArray();
      })
      .map(users => List.of(...users))
      .map(users => <List<User>>users.sortBy(user => user.nickOrder))
      .distinctUntilChanged(Immutable.is);
  }

  hubMessages(hub: Hub): Observable<List<Message>> {
    return Observable.merge(
      // initially all from storage
      Observable.from([this.storage.messages(hub)]),
      // merged with periodically checked
      Observable.interval(config.api.chat).startWith(0)
      .concatMap(() => {
        return this.jsonRPC('hub.getchat', { huburl: hub.url, separator: this.DEFAULT_SEPARATOR }, true);
      })
      .filter((messages: String[]) => messages.length > 0)
      .concatMap((messages: String[]) => Observable.from(messages))
      .map((rawText: String) => {
        let match = rawText.match(/^\s*(\[[^\]]*\])\s*<\s*([^\s>]*)\s*>\s*(.*)\s*$/);
        return {
          time: match[1],
          nick: match[2],
          text: match[3]
        };
      })
      .map(message => this.storage.combinedMessages(hub, message))
      .share()
    );
  }

  sendMessage(hub: Hub, text: string) {
    this.jsonRPC('hub.say', { huburl: hub.url, message: text }).subscribe();
  }
}
