// Name: Lai Chun Hin     SID: 1155064573
// Name: Chan Wang Wai    SID: 1155063885
// Name: Fong Kee Win     SID: 1155100567

import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services';
import { EventService } from '../_services';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  navLinks = [
    {label: 'User CRUD', path: './changeuser'} ,
    {label: 'Event CRUD', path: './changeevent'},
    {label: 'Upload CSV', path: './uploadcsv'},
    {label: 'Flush', path: './flush'}
  ];



  constructor( private userService: UserService,
    private eventService: EventService,
    private formbuilder: FormBuilder) { }

  ngOnInit() {


  }


}

