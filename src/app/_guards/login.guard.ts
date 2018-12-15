// Name: Lai Chun Hin     SID: 1155064573
// Name: Chan Wang Wai    SID: 1155063885
// Name: Fong Kee Win     SID: 1155100567

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlertService } from '../_services';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private router: Router,
      private alertservice: AlertService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if ((localStorage.getItem('adminUser') !== null ) || (localStorage.getItem('currentUser') !== null )) {
         this.alertservice.showAlert('You have logged in!');
         this.router.navigate(['/home']);

         return false;
        }
        return true;
    }
}
