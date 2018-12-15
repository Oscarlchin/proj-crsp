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
