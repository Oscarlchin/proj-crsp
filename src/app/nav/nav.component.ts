import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../_services';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input()
  currentUsernameIn = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
    ) {}

  ngOnInit() {
    const userI = JSON.parse(localStorage.getItem('currentUser'));
    console.log(userI);
    if (userI != null) {this.currentUsernameIn = userI['username']; }
  }

  onUserDisplay() {
    this.currentUsernameIn = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUsernameIn );
  }

  checking() {
    console.log(this.currentUsernameIn);
  }

  onLogoutUser() {this.currentUsernameIn = ''; }

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
