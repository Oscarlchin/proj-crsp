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
}
