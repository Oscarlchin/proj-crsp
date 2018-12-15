// Name: Lai Chun Hin     SID: 1155064573
// Name: Chan Wang Wai    SID: 1155063885
// Name: Fong Kee Win     SID: 1155100567

import { Component, OnInit } from '@angular/core';
import { UseractionService } from '../_services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isEvent = false;
  navLinks = [{label: 'All Events', path: './eventslist'} , {label: 'My Fav Events', path: './myfavevents'}] ;
  constructor( private useraction: UseractionService,
    private route: Router
    ) { }

  ngOnInit() {
    this.route.events.subscribe((event) => {
      const url =  window.location.toString();
      console.log(url);
      if (url.includes('/event/') ) {
        this.isEvent = true;
      } else {
        this.isEvent = false;
      }
    });
    this.useraction.refreshevent();

  }


}
