// Name: Lai Chun Hin     SID: 1155064573
// Name: Chan Wang Wai    SID: 1155063885
// Name: Fong Kee Win     SID: 1155100567

import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import { config } from '../_globals';
import {Observable} from 'rxjs';

@Injectable()
export class UploadService {
  constructor(private http: HttpClient) {}

  public upload(file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${config.BASE_API_URL}/upload-csv`, formData, {
      reportProgress: true,
    });
    return this.http.request(req);
  }
}

