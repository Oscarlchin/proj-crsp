import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent} from './login/login.component';
import { AuthGuard } from './_guards';

const routes: Routes = [
  { path: '', redirectTo: '/home' , pathMatch: 'full'  },
  { path: 'home', component : HomeComponent, canActivate: [AuthGuard]},
  { path: 'about', component: AboutComponent},
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
