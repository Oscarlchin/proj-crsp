import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../_globals';
import { User } from '../_models';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${config.BASE_API_URL}/users`);
    }

    getByName(username: string) {
        return this.http.get(`${config.BASE_API_URL}/users/` + username);
    }

    create(user: User) {
        return this.http.post(`${config.BASE_API_URL}/users/create`, user);
    }

    update(oldUsername, user: User) {
        return this.http.put(`${config.BASE_API_URL}/users/` + oldUsername, user);
    }

    delete(username: string) {
        return this.http.delete(`${config.BASE_API_URL}/users/` + username);
    }
}
