import { Component, OnInit } from '@angular/core';
import { EventService } from '../_services';

@Component({
  selector: 'app-eventslist',
  templateUrl: './eventslist.component.html',
  styleUrls: ['./eventslist.component.css']
})
export class EventslistComponent implements OnInit {
//  const allEvent = '';
  constructor( private eventService: EventService ) {
  }

  ngOnInit() {
    console.log(this.eventService.getAll());
  }

}
