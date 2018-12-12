import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploadcsv',
  templateUrl: './uploadcsv.component.html',
  styleUrls: ['./uploadcsv.component.css']
})
export class UploadcsvComponent implements OnInit {
  name: string = '';
  uploadFile: File;

  constructor() { }

  ngOnInit() {
  }
  openInput(){
    // your can use ElementRef for this later
    document.getElementById('fileInput').click();
  }

  fileChange(files: File[]) {
    if (files.length > 0) {
      this.uploadFile = files[0];
      this.name = this.uploadFile.name;
    }
  }
  upload() {
    console.log('sending this to server', this.uploadFile);
  }

}
