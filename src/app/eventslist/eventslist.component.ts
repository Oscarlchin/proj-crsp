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
//  public allEvent$: Observable<Event[]>;
   allevents: Event[] = [];
   dataLoading = false;
   selected: number = 0;
  // Eve: String = null;
  fields: Field[] = [
    {value: 0, viewValue: 'All'},
    {value: 1, viewValue: 'Name'},
    {value: 2, viewValue: 'Type'},
    {value: 3, viewValue: 'District'},
    {value: 4, viewValue: 'Fee'},

  ];

  displayedColumns: string[] = ['program_name', 'type_name', 'district', 'fee'];
  dataSource: MatTableDataSource<Event>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private useraction: UseractionService
    ) {
      this.dataSource = new MatTableDataSource(this.allevents);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function(data: Event , filter: string): boolean {
      if (data && data.program_name && data.district && data.fee && data.type_name) {
      switch (this.selected) {
        case 0: {
          return data.program_name.toLowerCase().includes(filter) ||
                  data.type_name.toLowerCase().includes(filter) ||
                   data.district.toLowerCase().includes(filter) ||
                   data.fee.toString().includes(filter);
        }

        case 1: {
          return data.program_name.toLowerCase().includes(filter.toLowerCase());
        }
        case 2: {
          return data.type_name.toLowerCase().includes(filter);
        }
        case 3: {
          return data.district.toLowerCase().includes(filter);
        }
        case 4: {
          return data.fee.toString().includes(filter);
        }
        default: {
          return data.program_name.toLowerCase().includes(filter) ||
                  data.type_name.toLowerCase().includes(filter) ||
                   data.district.toLowerCase().includes(filter) ||
                   data.fee.toString().includes(filter);
        }
      }
      } else {return true; }
   };
  }

  getAllEvent() {
    this.useraction.getevent().subscribe((events) => {
      this.dataSource.data = events;
      this.dataLoading = true;
      console.log('succuess!');


    });
  }

  applyFilter(filterValue: string) {
    this.selected = 0;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
