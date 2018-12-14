import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../_globals';
import { Event } from '../_models';

@Injectable()
export class EventService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Event[]>(`${config.BASE_API_URL}/events`);
    }

    getById(program_id: number) {
        return this.http.get<any>(`${config.BASE_API_URL}/events/` + program_id);
    }

    create(event: Event) {
        return this.http.post<any>(`${config.BASE_API_URL}/events/create`, event);
    }

    update(event: Event) {
        return this.http.put<any>(`${config.BASE_API_URL}/events/` + event.program_id, event);
    }

    delete(id: number) {
        return this.http.delete(`${config.BASE_API_URL}/events/` + id);
    }
}
