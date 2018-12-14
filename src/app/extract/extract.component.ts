import { Component, OnInit } from '@angular/core';
import { FlushService , AlertService } from '../_services';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.css']
})
export class ExtractComponent implements OnInit {

  constructor(private flushservice: FlushService,
    private alertservice: AlertService ) { }

  ngOnInit() {
  }

  extract() {
    this.flushservice.flush().subscribe(data => {
      if (data) { this.alertservice.showAlert('Success'); }
    }, error => console.log(error));
  }

}
