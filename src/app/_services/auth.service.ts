import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from '../_globals';
import { User } from '../_models';

@Injectable()
export class AuthService {

   loginObject: User = null;



    constructor(private http: HttpClient) { }

    isLoggedIn(): boolean {
      return !!this.loginObject;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${config.BASE_API_URL}/users/authenticate`, { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.loginObject = user;
                    console.log(user);
                }

                return user;
            }));
        }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        // remove admin login
        localStorage.removeItem('adminUser');
        this.loginObject = null;
    }
    adminlogin(username: string, password: string) {
      return this.http.post<any>(`${config.BASE_API_URL}/admin/authenticate`, { username: username, password: password })
          .pipe(map(admin => {
              // login successful if there's a jwt token in the response
              if (admin && admin.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('adminUser', JSON.stringify(admin));
                  this.loginObject = admin;
                  console.log(admin);
              }

              return admin;
          }));
      }

}
