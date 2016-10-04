import { Observable } from 'rxjs/Rx';
import { List } from 'immutable';

import { hashCode, User } from '../index';


export class Hub {
  url: String;
  name: String;
  description: String;
  share: Number;
  users$: Observable<List<User>>;

  equals(other: Hub): boolean {
    return this.url === other.url;
  }

  hashCode(): Number {
    return hashCode(this.url);
  }
}
