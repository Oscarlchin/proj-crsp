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
 // public allEvent: Event[] = [];
  constructor( private useraction: UseractionService
    ) {
  }

  ngOnInit() {
  }


  get AllEvent() {
    return this.useraction.getevent();
  //  return 0;
  }

  getAllFavEvent() {
    this.useraction.getevent();
  }

}
