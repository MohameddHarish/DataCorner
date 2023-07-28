import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { FormComponent } from './component/form/form.component';
import { EmployeetableComponent } from './component/employeetable/employeetable.component';

import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HeaderComponent } from './component/header/header.component';
import { AddFormComponent } from './component/add-form/add-form.component';




const routes: Routes = [

  // {
  //   path: 'form',
  //   component: FormComponent
  // },
  {
    path: "add-form",
    component: AddFormComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {path: 'employee', component: EmployeetableComponent },
  {path: 'employee/:id', component: EmployeetableComponent },

  
  

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
 
  // { path: 'form/:id', component: FormComponent }
  
{ path: 'add-form/:id', component: AddFormComponent }
 

];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
