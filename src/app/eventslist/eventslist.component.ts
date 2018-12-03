import { Component, OnInit } from '@angular/core';
import { UseractionService } from '../_services';
import { Observable } from 'rxjs';
import { Event } from '../_models';
import { first } from 'rxjs/operators';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';


@Component({
  selector: 'app-eventslist',
  templateUrl: './eventslist.component.html',
  styleUrls: ['./eventslist.component.css']
})
export class EventslistComponent implements OnInit {
//  public allEvent$: Observable<Event[]>;
  allevents: Event[] = [];
  Eve: String = null;

  constructor( private useraction: UseractionService
    ) {
  }

  ngOnInit() {
  }

  getAllEvent() {
    this.useraction.getevent().subscribe((events) => {
      this.allevents = events;
      console.log('succuess!');
      console.log(this.allevents[0]);
    });
  }

}
