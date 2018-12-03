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
   allevents: Event[];
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

  displayedColumns: string[] = ['program_id','program_name', 'type_name', 'district', 'fee'];
  dataSource: MatTableDataSource<Event>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private useraction: UseractionService
    ) {
      this.dataSource = new MatTableDataSource(this.allevents);
  }

  ngOnInit() {
    this.getAllEvent();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function(data: Event , filter: any): boolean {
      if (data && data.program_name && data.district && (data.fee  !== null) && data.type_name) {
      switch (filter.field) {
        case 0: {
          return data.program_name.toLowerCase().includes(filter.fv) ||
                  data.type_name.toLowerCase().includes(filter.fv) ||
                   data.district.toLowerCase().includes(filter.fv) ||
                   data.fee.toString().includes(filter.fv);
        }

        case 1: {
          return data.program_name.toLowerCase().includes(filter.fv);
        }
        case 2: {
          return data.type_name.toLowerCase().includes(filter.fv);
        }
        case 3: {
          return data.district.toLowerCase().includes(filter.fv);
        }
        case 4: {
          return data.fee.toString().includes(filter.fv);
        }
        default: {
          return data.program_name.toLowerCase().includes(filter.fv) ||
                  data.type_name.toLowerCase().includes(filter.fv) ||
                   data.district.toLowerCase().includes(filter.fv) ||
                   data.fee.toString().includes(filter.fv);
        }
      }
      } else {return true; }
   };
  }

  getAllEvent() {
    this.useraction.getevent().subscribe((events) => {
      this.dataSource.data = events;
      this.dataLoading = true;
      console.log(events.length);
      console.log('succuess!');


    });
  }

  applyFilter(filterValue: string) {
    const customf = {
      fv: filterValue.trim().toLowerCase(),
      field: this.selected
     };

    this.dataSource.filter = customf;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
