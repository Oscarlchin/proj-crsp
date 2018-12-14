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
