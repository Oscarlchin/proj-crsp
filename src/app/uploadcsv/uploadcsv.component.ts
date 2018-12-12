import { Component, OnInit } from '@angular/core';
import { UploadService } from '../_services';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-uploadcsv',
  templateUrl: './uploadcsv.component.html',
  styleUrls: ['./uploadcsv.component.css']
})
export class UploadcsvComponent implements OnInit {
  name: string = '';
  uploadFile: File;
  isCSV: boolean = true;
  constructor(private uploadService: UploadService) { }

  ngOnInit() {
  }
  openInput() {
    // your can use ElementRef for this later
    document.getElementById('fileInput').click();
  }

  fileChange(files: File[]) {
    if (files.length > 0) {
      this.uploadFile = files[0];
      this.name = this.uploadFile.name;
      const fn = this.name.split('.');
      if (fn[fn.length - 1].toLocaleLowerCase() === 'csv') {
        this.isCSV = true;
      } else {
        this.isCSV = false;
      }
    }
  }
  upload() {
    this.uploadService.upload(this.uploadFile).subscribe( (data: any) => {
      console.log(data);
      if (data.type == 1 && data.loaded && data.total) {
        // This is an upload progress event. Compute and show the % done:
        const percentDone = Math.round(100 * data.loaded / data.total);
        console.log(`File is ${percentDone}% uploaded.`);
      } else if (data.body) {
        console.log('File is completely uploaded!');
        console.log(data.body);
      }
    });
    console.log('sending this to server', this.uploadFile);
  }

}
