import { hashCode } from '../index';


export class User {
  cid: string;
  connection: string;
  description: string;
  ip: string;
  icon: string;
  nick: string;
  nickOrder: string;
  shared: Number;
  tag: string;
  email: string;

  equals(other: User): boolean {
    return this.cid === other.cid;
  }

  hashCode(): Number {
    return hashCode(this.cid);
  }

}
