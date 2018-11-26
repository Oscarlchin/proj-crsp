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

    getById(id: number) {
        return this.http.get(`${config.BASE_API_URL}/events/` + id);
    }

    create(event: Event) {
        return this.http.post(`${config.BASE_API_URL}/events/create`, event);
    }

    update(event: Event) {
        return this.http.put(`${config.BASE_API_URL}/events/` + event.id, event);
    }

    delete(id: number) {
        return this.http.delete(`${config.BASE_API_URL}/events/` + id);
    }
}
