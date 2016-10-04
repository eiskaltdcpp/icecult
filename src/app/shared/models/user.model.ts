import { hashCode } from '../index';


export class User {
  cid: String;
  connection: String;
  description: String;
  ip: String;
  icon: String;
  nick: String;
  nickOrder: String;
  shared: Number;
  tag: String;
  email: String;

  equals(other: User): boolean {
    return this.cid === other.cid;
  }

  hashCode(): Number {
    return hashCode(this.cid);
  }

}
