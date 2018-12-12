import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { EventslistComponent } from './eventslist/eventslist.component';


import { AuthGuard, AdminGuard } from './_guards';
import {
  AuthService, UserService, EventService,
  UseractionService, AlertService
} from './_services';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AdminComponent } from './admin/admin.component';
import {MaterialModule} from './app.material-module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//  import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { EventdetailComponent } from './eventdetail/eventdetail.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChangeuserComponent } from './changeuser/changeuser.component';
import { ChangeeventComponent } from './changeevent/changeevent.component';

const modules = [
  MatPaginatorModule,
  MatTableModule,
  MatFormFieldModule,
  MatSortModule,
  MatInputModule,
  MatSelectModule,
  MaterialModule,
  MatCardModule,
  MatButtonModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    EventslistComponent,
    AdminComponent,
    EventdetailComponent,
    ChangeuserComponent,
    ChangeeventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ...modules,
  ],
  exports: [
    ...modules
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    AuthService,
    EventService,
    UserService,
    UseractionService,
    AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




