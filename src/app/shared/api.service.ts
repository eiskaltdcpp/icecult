import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ApiService {
  constructor(private http: Http) { }

  private jsonRPC(method: String, parameters?: Array<any>, isSeperatedList?: String): Observable<any> {
    return this.http.request(new Request(new RequestOptions({
      url: '/rpc/',
      method: RequestMethod.Post,
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        'jsonrpc': '2.0',
        'method': 'show.version',
        'params': undefined,
        'id': 1
      }),
    })))
    .map((res: Response) => res.json().result)
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  showVersion(): Observable<String> {
    return this.jsonRPC('show.version');
  }
}
