// Name: Lai Chun Hin     SID: 1155064573
// Name: Chan Wang Wai    SID: 1155063885
// Name: Fong Kee Win     SID: 1155100567

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../_services';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
    ) {}

  ngOnInit() {
    if (localStorage.currentUser) {
      this.authService.loginObject = JSON.parse(localStorage.currentUser);

    } else if (localStorage.adminUser) {
      this.authService.loginObject = JSON.parse(localStorage.adminUser);
    }
  }
  get userName(): string {
    return this.authService.loginObject.username;
  }

  get isLogin(): boolean {
    return this.authService.isLoggedIn();
  }

  AdminLogin() {

    this.authService.adminlogin('admin', 'admin')
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate(['/admin']);
                // console.log(this.authService.loginObject);
            },
            error => {
                //  this.alertService.error(error);
                console.log('adminloginerror');
            });

  }
  logout() {
    // reset login status
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
