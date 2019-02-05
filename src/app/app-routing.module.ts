import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent }      from './home/home.component';
import { LoginComponent }      from './login/login.component';
import { ManageSeriesComponent } from './admin/manage-series/manage-series.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/series', component: ManageSeriesComponent },
  { path: 'admin/users', component: ManageUsersComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
