import { hashCode } from '../index';


export class Hub {
  url: String;
  name: String;
  description: String;
  share: Number;
  users: Number;

  equals(other: Hub): boolean {
    return this.url === other.url;
  }

  hashCode(): Number {
    return hashCode(this.url);
  }
}
