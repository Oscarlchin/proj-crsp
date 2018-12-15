import { Component, OnInit } from '@angular/core';
import {AuthService, UseractionService} from '../_services';
import {Event } from '../_models';
@Component({
  selector: 'app-myfavevents',
  templateUrl: './myfavevents.component.html',
  styleUrls: ['./myfavevents.component.css']
})
export class MyfaveventsComponent implements OnInit {
  favevents: Event[] = [];
  hasfav = false;
  constructor(private authservice: AuthService,
    private useractionservice: UseractionService) { }

  ngOnInit() {
    this.useractionservice.Event$.subscribe(data => {
      if (!data) { return; }
      for (const fav of this.authservice.loginObject.favevents) {
        for ( const e of data ) {
          if (e.program_id === fav) {
            this.favevents.push(e);
            this.hasfav = true;
            break;
          }
        }
      }
    });
  }

}
