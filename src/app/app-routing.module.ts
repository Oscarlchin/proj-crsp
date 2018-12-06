import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent} from './login/login.component';
import { AuthGuard, AdminGuard } from './_guards';
import { EventslistComponent } from './eventslist/eventslist.component';
import { AdminComponent } from './admin/admin.component';
import { EventdetailComponent } from './eventdetail/eventdetail.component';

const routes: Routes = [
  { path: '', redirectTo: '/home' , pathMatch: 'full'  },
  { path: 'home', component : HomeComponent, canActivate: [AuthGuard],
    children: [
      {
       path: 'eventslist',
       component: EventslistComponent
      },
      {
       path: 'event/:id',
       component: EventdetailComponent
      }
  ]},
  { path: 'about', component: AboutComponent},
  { path: 'login', component: LoginComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
