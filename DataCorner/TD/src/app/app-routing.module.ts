import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeetableComponent } from './component/employeetable/employeetable.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HeaderComponent } from './component/header/header.component';
import { ViewFormComponent } from './component/view-form/view-form.component';

const routes: Routes = [
 
  {
    path: '',
    component: LoginComponent
  },
  { path: 'employee/:category', component: EmployeetableComponent },

  {
    path: 'login',
    component: LoginComponent
  },
  
  {
    path: 'header',
    component: HeaderComponent
  }
  ,
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path:'view-form',
    component: ViewFormComponent
  },
  { path: 'view-form/:id', component: ViewFormComponent },
 
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
