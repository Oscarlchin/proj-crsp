// Name: Lai Chun Hin     SID: 1155064573
// Name: Chan Wang Wai    SID: 1155063885
// Name: Fong Kee Win     SID: 1155100567

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlertService } from '../_services';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
      private alertservice: AlertService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        if (localStorage.getItem('adminUser')) {
          this.alertservice.showAlert('You have logged in as admin!');
          this.router.navigate(['/admin']);
          return false;
        }
        // this.alertservice.showAlert('You are not logged in!');
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
