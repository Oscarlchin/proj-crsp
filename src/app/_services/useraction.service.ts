import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../_globals';
import { User, Event, EventComment } from '../_models';

@Injectable()
export class UseractionService {
  constructor(private http: HttpClient) { }
  getevent() {
    return this.http.get<Event[]>(`${config.BASE_API_URL}/useraction/events`) ;
  }
  likeevent(username: string , program_id: number) {
    return this.http.put<User>(`${config.BASE_API_URL}/useraction/` + username + '/likeevent', {program_id: program_id} );
  }

  unlikeevent(username: string , program_id: number) {
    return this.http.put<User>(`${config.BASE_API_URL}/useraction/` + username + '/unlikeevent', {program_id: program_id} );
  }

  leavecomment(user_comment: string) {
    return this.http.put<Event>(`${config.BASE_API_URL}/useraction/leavecomment`, {user_comment: user_comment} );
  }

  getcomment(program_id: number) {
    return this.http.get<EventComment>(`${config.BASE_API_URL}/useraction/comment/` + program_id);
  }
}
