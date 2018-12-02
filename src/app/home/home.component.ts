import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isBig = false;
  constructor() { }

  ngOnInit() {

  }

  myclick() {
    if (this.isBig) {
      this.isBig = false;
    } else {
      this.isBig = true;
    }
  }

}
