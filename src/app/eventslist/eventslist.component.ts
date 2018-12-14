import { Component, OnInit, ViewChild } from '@angular/core';
import { UseractionService } from '../_services';
import { Observable } from 'rxjs';
import { Event } from '../_models';
import { first } from 'rxjs/operators';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
// import {MatFormFieldModule} from '@angular/material/form-field';

export interface Field {
  value: number;
  viewValue: string;
}


@Component({
  selector: 'app-eventslist',
  templateUrl: './eventslist.component.html',
  styleUrls: ['./eventslist.component.css']
})
export class EventslistComponent implements OnInit {
   dataLoading = false;
   selected: number = 0;
  fields: Field[] = [
    {value: 0, viewValue: 'All'},
    {value: 1, viewValue: 'Name'},
    {value: 2, viewValue: 'Type'},
    {value: 3, viewValue: 'Venue'},
    {value: 4, viewValue: 'Day and Time'},
    {value: 5, viewValue: 'Fee'},

  ];

  displayedColumns: string[] = ['program_name', 'type_name', 'venue', 'day_time' , 'fee'];
  dataSource: MatTableDataSource<Event>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private useraction: UseractionService
    ) {
      this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.useraction.Event$.subscribe(data => {
      if (!data) { return; }
      this.dataSource.data = data;
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function(data: Event , filterS: string): boolean {
      const filter = JSON.parse(filterS);
      if (data && data.program_name && data.district && (data.fee  !== null) && data.type_name) {
      switch (filter.field) {
        case 0: {
          return data.program_name.toLowerCase().includes(filter.fv) ||
                  data.type_name.toLowerCase().includes(filter.fv) ||
                   data.venue.toLowerCase().includes(filter.fv) ||
                   (data.start_date.toString() + ' ' + data.start_time).includes(filter.fv) ||
                   data.fee.toString().includes(filter.fv);
        }

        case 1: {
          return data.program_name.toLowerCase().includes(filter.fv);
        }
        case 2: {
          return data.type_name.toLowerCase().includes(filter.fv);
        }
        case 3: {
          return data.venue.toLowerCase().includes(filter.fv);
        }
        case 4: {
          return (data.start_date.toString() + ' ' + data.start_time).includes(filter.fv);
        }
        case 5: {
          return data.fee.toString().includes(filter.fv);
        }
        default: {
          return data.program_name.toLowerCase().includes(filter.fv) ||
                  data.type_name.toLowerCase().includes(filter.fv) ||
                   data.venue.toLowerCase().includes(filter.fv) ||
                   (data.start_date.toString() + ' ' + data.start_time).includes(filter.fv) ||
                   data.fee.toString().includes(filter.fv);
        }
      }
      } else {return true; }
   };
  }

  //refresh() {
  //  this.useraction.getevent().subscribe(data => {});
  //}

  applyFilter(filterValue: string) {
    const customf = {
      fv: filterValue.trim().toLowerCase(),
      field: this.selected
     };

    this.dataSource.filter = JSON.stringify(customf);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
