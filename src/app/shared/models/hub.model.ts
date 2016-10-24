import { Observable } from 'rxjs/Rx';
import { List } from 'immutable';

import { hashCode, User, Message } from '..';


export class Hub {
  url: string;
  name: string;
  description: string;
  share: Number;
  users$: Observable<List<User>>;
  messages$: Observable<List<Message>>;

  equals(other: Hub): boolean {
    return this.url === other.url;
  }

  hashCode(): Number {
    return hashCode(this.url);
  }
}
