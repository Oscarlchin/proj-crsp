import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services';
import { User } from '../_models';
import { EventService } from '../_services';
import { Event } from '../_models';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {





  constructor( private userService: UserService,
    private eventService: EventService,
    private formbuilder: FormBuilder) { }

  ngOnInit() {


  }


}

