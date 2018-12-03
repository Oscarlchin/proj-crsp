import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services';
import { User } from '../_models';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private registerForm: FormGroup;

  newUsername;
  newPassword;

  constructor( private userService: UserService,
    private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formbuilder.group({
      newUsername : ['', Validators.required],
      newPassword : ['', Validators.required]
    });
  }

  createUser() {
    const newUser: User = {
      username : 'carsten',
      password : 'carsten',
      favevents : []
    };
    console.log(newUser);
    this.userService.create(newUser).subscribe((event) => {
      console.log('Okay~');
    },
    error => {console.log('error'); }
    );
  }

}
