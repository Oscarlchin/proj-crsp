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
    private authService: AuthService) { }

  ngOnInit() {
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
