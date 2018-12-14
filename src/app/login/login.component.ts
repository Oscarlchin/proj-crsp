import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService, AlertService } from '../_services';
import { ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  matcher = new MyErrorStateMatcher;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
    private alertService: AlertService
    ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required,
        Validators.minLength(4), Validators.maxLength(20)] ],
      password: ['', [Validators.required,
        Validators.minLength(4), Validators.maxLength(20)] ]
    });

    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

    // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
              if (data.error) {
                this.alertService.showAlert(data.error);
                this.loading = false;
                this.loginForm.reset();
                this.loginForm.markAsPristine();
                this.loginForm.markAsUntouched();
              } else {
                this.router.navigate([this.returnUrl]);
              }
            },
            error => {
                this.alertService.showAlert(error.toString());
                this.loading = false;
                this.loginForm.reset();
                this.loginForm.markAsPristine();
                this.loginForm.markAsUntouched();
            });
  }
}
