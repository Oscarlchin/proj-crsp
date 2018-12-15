// Name: Lai Chun Hin     SID: 1155064573
// Name: Chan Wang Wai    SID: 1155063885
// Name: Fong Kee Win     SID: 1155100567

import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { config } from '../_globals';

@Injectable()
export class FlushService {
  constructor(private http: HttpClient) {}

  public flush() {
    return this.http.get(`${config.BASE_API_URL}/extracttolocal`);
  }
}
