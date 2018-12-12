import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services';
import { User } from '../_models';
import { EventService } from '../_services';
import { Event } from '../_models';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-changeuser',
  templateUrl: './changeuser.component.html',
  styleUrls: ['./changeuser.component.css']
})
export class ChangeuserComponent implements OnInit {

  registerForm: FormGroup;
  updateForm: FormGroup;
  getOneForm: FormGroup;
  deleteOneForm: FormGroup;

  createOutput = '';
  updateOutput = '';
  getOneOutput = '';
  deleteOneOutput = '';

  constructor(
    private userService: UserService,
    private eventService: EventService,
    private formbuilder: FormBuilder
  ) { }

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

    this.getOneForm = this.formbuilder.group({
      getOneUsername : ''
    });

    this.deleteOneForm = this.formbuilder.group({
      deleteOneUsername : ''
    });
  }


  createUser() {
    const newUser: User = {
//        username : 'oscar100',
//       password : 'oscar100',
      username : this.registerForm.get('newUsername').value,
      password : this.registerForm.get('newPassword').value,
      favevents : []
    };
    console.log(newUser);
    this.userService.create(newUser).subscribe((event) => {
      console.log(event);
      if (this.registerForm.get('newUsername').value === ''
      || this.registerForm.get('newPassword').value === '') {
        this.createOutput = 'Please enter something!';
       } else {
        this.createOutput = 'Username: ' + this.registerForm.get('newUsername').value + '/n'
          + 'Password: ' + this.registerForm.get('newPassword').value;
     }
    },
    error => {this.createOutput = 'Error. Please Check!'; }
    );
  }

  updateUser() {
    const updateUser: User = {
      //       username : 'oscarUP',
      //       password : 'oscarUP',
             username : this.updateForm.get('updateNewUsername').value,
             password : this.updateForm.get('updateNewPassword').value,
             favevents : []
         };
//         console.log(this.updateForm.get('preUpdateUsername').value);
//         console.log(updateUser);
         this.userService.update(this.updateForm.get('preUpdateUsername').value, updateUser).subscribe((event) => {
          if (this.updateForm.get('preUpdateUsername').value === ''
          || this.updateForm.get('updateNewUsername').value === ''
          || this.updateForm.get('updateNewPassword').value === '') {
            this.updateOutput = 'Please enter something!';
          } else if (event == null) {
            this.updateOutput = 'User not found on database. Please Check!';
          } else {
            this.updateOutput = 'Updated Username: ' + event['username'] + '/n' + 'Updated Password: ' + event['password'];
         }
        },
        error => {this.updateOutput = 'Error. Please Check!'; }
         );
  }

  getOneUser() {
         this.userService.getByName(this.getOneForm.get('getOneUsername').value).subscribe((event) => {
           if (this.getOneForm.get('getOneUsername').value === '') {
             this.getOneOutput = 'Please enter something!';
            } else if (event == null) {
              this.getOneOutput = 'User not found on database. Please Check!';
            } else {
             this.getOneOutput = 'Username: ' + event['username'] + '/n' + 'Password: ' + event['password'] +
           '<br/> Favorite Event: ' + event['favevents'] + '<br/>';
          }
         },
         error => {this.getOneOutput = 'Error. Please Check!'; }
         );
  }

  deleteOneUser() {
    this.deleteOneOutput = ''; // reset to look better
    this.userService.delete(this.deleteOneForm.get('deleteOneUsername').value).subscribe((event) => {
      console.log(event);
      this.deleteOneOutput = 'User deleted!';
    },
    error => {this.deleteOneOutput = 'User not found on database. Please Check!'; }
    );
  }

}
