import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor( private userservice: UserService) { }

  ngOnInit() {
  }

  createUser(newUsername, newPassword) {
    let newUser = new User;
    newUser.username = newUsername;
    newUser.password = newPassword;
    this.userservice.create(newUser);
  }

}
