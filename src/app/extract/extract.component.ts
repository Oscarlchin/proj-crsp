import { Component, OnInit } from '@angular/core';
import { FlushService , AlertService } from '../_services';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.css']
})
export class ExtractComponent implements OnInit {
  loading: boolean = false;
  constructor(private flushservice: FlushService,
    private alertservice: AlertService ) { }

  ngOnInit() {
  }

  extract() {
    this.loading = true;
    this.flushservice.flush().subscribe(data => {
      this.loading = false;
      if (data) { this.alertservice.showAlert('Success'); }
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }

}
