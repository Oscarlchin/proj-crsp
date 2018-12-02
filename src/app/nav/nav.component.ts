import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  currentUsername = '' ;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private user: User) { }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUsername = currentUser['username'];
    console.dir(this.currentUsername);
  }

  AdminLogin() {
    this.authService.adminlogin('admin', 'admin')
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate(['/admin']);
            },
            error => {
                //  this.alertService.error(error);
                console.log('adminloginerror');
            });
  }

}
