import { Component, OnInit } from '@angular/core';
import { UseractionService } from '../_services';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isBig = false;
  constructor( private useraction: UseractionService ) { }

  ngOnInit() {
    this.useraction.refreshevent();
  }

  myclick() {
    if (this.isBig) {
      this.isBig = false;
    } else {
      this.isBig = true;
    }
  }

}
