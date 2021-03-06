// Name: Lai Chun Hin     SID: 1155064573
// Name: Chan Wang Wai    SID: 1155063885
// Name: Fong Kee Win     SID: 1155100567

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../_globals';
import { User, Event, EventComment } from '../_models';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UseractionService {
  private _EventSource = new BehaviorSubject<Event[]>(null);
  public Event$ = this._EventSource.asObservable();

  constructor(private http: HttpClient) {

  }

  refreshevent() {
    this.getevent().subscribe( response => {
      // console.log(response[0]);
      this._EventSource.next(response);
    });
    return;
  }

  getevent() {

    return this.http.get<Event[]>(`${config.BASE_API_URL}/useraction/events`) ;
  }
  likeevent(username: string , program_id: number) {
    return this.http.put<any>(`${config.BASE_API_URL}/useraction/` + username + '/likeevent', {program_id: program_id} );
  }

  unlikeevent(username: string , program_id: number) {
    return this.http.put<any>(`${config.BASE_API_URL}/useraction/` + username + '/unlikeevent', {program_id: program_id} );
  }

  leavecomment(username: string, program_id: number , user_comment: string) {
    return this.http.put<EventComment>(`${config.BASE_API_URL}/useraction/` + username +
     '/' +  program_id + '/leavecomment', {user_comment: user_comment} );
  }

  getcomment(program_id: number) {
    return this.http.get<EventComment>(`${config.BASE_API_URL}/useraction/comment/` + program_id);
  }
}
