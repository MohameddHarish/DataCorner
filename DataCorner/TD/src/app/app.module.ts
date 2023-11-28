import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { FormComponent } from './component/form/form.component';

import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';
import { EmployeetableComponent } from './component/employeetable/employeetable.component';
import { SearchComponent } from './component/search/search.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HeaderComponent } from './component/header/header.component';

import { MatNativeDateModule } from '@angular/material/core';
import { ViewFormComponent } from './component/view-form/view-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Import the material module
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InfoPopupComponent } from './component/info-popup/info-popup.component';
import { ManagePermissionComponent } from './component/manage-permission/manage-permission.component';
import { ProjectPopupComponent } from './component/project-popup/project-popup.component';
import { AssettableComponent } from './component/assettable/assettable.component';
import { AssetManagementComponent } from './component/asset-management from/asset-management.component';
import { NgChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AssetAllocateFormComponent } from './component/asset-allocate-form/asset-allocate-form.component';



@NgModule({
  declarations: [
    AppComponent,
    EmployeetableComponent,
    SearchComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    ViewFormComponent,
    InfoPopupComponent,
    ManagePermissionComponent,
    ProjectPopupComponent,
    AssetManagementComponent,
    AssettableComponent,
    AssetAllocateFormComponent,
  ],
  imports: [
  
  MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    BrowserModule,
    MatToolbarModule,
    MatCardModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCheckboxModule,
    NgChartsModule,
    NgApexchartsModule,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

