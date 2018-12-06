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

  registerForm: FormGroup;
  updateForm: FormGroup;

  constructor( private userService: UserService,
    private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formbuilder.group({
      newUsername : '',
      newPassword : ''
    });

    this.updateForm = this.formbuilder.group({
      preUpdateUsername : '',
      updateNewUsername : '',
      updateNewPassword : ''
    });
  }

  createUser() {
    const newUser: User = {
 //       username : 'oscar',
 //       password : 'oscar',
      username : JSON.stringify(this.registerForm.get('newUsername').value),
      password : JSON.stringify(this.registerForm.get('newPassword').value),
      favevents : []
    };
    console.log(newUser);
    this.userService.create(newUser).subscribe((event) => {
      console.log('Okay~');
    },
    error => {console.log('error'); }
    );
  }

  updateUser() {
    const updateUser: User = {
             username : 'oscar',
             password : 'oscar2',
      //     username : JSON.stringify(this.updateForm.get('updateNewUsername').value)),
      //     password : JSON.stringify(this.updateForm.get('updateNewPassword').value)),
             favevents : []
         };
         console.log(JSON.stringify(this.updateForm.get('preUpdateUsername').value));
         console.log(updateUser);
         this.userService.update(JSON.stringify(this.updateForm.get('preUpdateUsername').value), updateUser).subscribe((event) => {
           console.log('Okay~');
         },
         error => {console.log('error'); }
         );
  }
}
