import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../_globals';
import { User, Event } from '../_models';

@Injectable()
export class UseractionService {
  constructor(private http: HttpClient) { }
  getevent() {  // get the events for table
    return this.http.get<Event[]>(`${config.BASE_API_URL}/useraction/events`);
  }
  favevent(program_id: number) {
    return this.http.put<User>(`${config.BASE_API_URL}/useraction/favevent`, {program_id: program_id} );
  }
  leavecomment(user_comment: string) {
    return this.http.put<Event>(`${config.BASE_API_URL}/useraction/leavecomment`, {user_comment: user_comment} );
  }

}
