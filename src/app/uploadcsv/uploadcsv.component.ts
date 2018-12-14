import { Component, OnInit  } from '@angular/core';
import { UploadService, AlertService } from '../_services';

@Component({
  selector: 'app-uploadcsv',
  templateUrl: './uploadcsv.component.html',
  styleUrls: ['./uploadcsv.component.css']
})
export class UploadcsvComponent implements OnInit {


  name: string = '';
  uploadFile: File;
  isCSV: boolean = true;
  progressvalue: number = 0;
  isLoading: boolean = false;
  constructor(private uploadService: UploadService,
    private alertService: AlertService) { }

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
    this.isLoading = true;
    this.uploadService.upload(this.uploadFile).subscribe( (data: any) => {
      console.log(data);
      if (data.type == 1 && data.loaded && data.total) {
        this.progressvalue = Math.round(100 * data.loaded / data.total);
      } else if (data.body) {
        this.isLoading = false;
        this.alertService.showAlert('Done!!');
        document.getElementById('fileInput').textContent = null;
        this.uploadFile = null;


      }
    },
    error => console.log(error) );
  }

}
