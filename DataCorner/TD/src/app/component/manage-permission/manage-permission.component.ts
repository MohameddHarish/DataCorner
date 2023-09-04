import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { environment } from 'src/environments/environment.development';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-manage-permission',
  templateUrl: './manage-permission.component.html',
  styleUrls: ['./manage-permission.component.scss']
})
export class ManagePermissionComponent implements OnInit {

  userId!: number;
  roleId!: number;
  category: any;
  roleData: any;
  userPosts: any[] = [];
  isUpdateMode: boolean = false;
  @ViewChild(MatSort) sort!: MatSort;
  dashboardData:  { [category: string]: any[] } = {};
  showColumns: boolean = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['RoleName','serialNumber','empId', 'name', 'doj', 'project_Id', 'project_Name', 'category', 'pcd', 'prospects', 'skill_Set', 'reportingTo', 'division_id', 'division', 'sub_Div', 'skill_Catagories', 'skill_Clusters', 'yop', 'education', 'prev_Exp', 'leadName', 'location', 'project_Experience', 'top', 'tcd', 'dot', 'months_in_SS', 'batch', 'contact', 'mailId','actions'];
  userRole: string = '';
  selectedColumns: string[] = this.displayedColumns;
  columns: string[] = ['RoleName','serialNumber','empId', 'name', 'doj', 'project_Id', 'project_Name', 'category', 'pcd', 'prospects', 'skill_Set', 'reportingTo', 'division_id', 'division', 'sub_Div', 'skill_Catagories', 'skill_Clusters', 'yop', 'education', 'prev_Exp', 'leadName', 'location', 'project_Experience', 'top', 'tcd', 'dot', 'months_in_SS', 'batch', 'contact', 'mailId','actions'];
  selectedColumnsByRole: { [roleName: string]: string[] } = {};
  defaultColumnsByRole: { [roleName: string]: string } = {};
  constructor(
    private http: HttpClient,
    public router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.userRole = this.authService.getUserRole();
      this.category = params['category'];
      this.roleId = this.authService.getRoleId();
      this.http.get<any[]>('https://localhost:7247/api/account').subscribe(
        (response: any[]) => {
          response.forEach(user => {
            const userRole = response.find(role => role.roleId === user.roleId);
            user.RoleName = userRole ? userRole.roleName : 'Unknown Role';
            
            // Store the default columns for each role in the dictionary
            this.defaultColumnsByRole[user.RoleName] = userRole ? userRole.defaultColumns : '';
  
            // Initialize the selectedColumns based on the default columns
            this.selectedColumnsByRole[user.RoleName] = userRole ? userRole.defaultColumns.split(',') : [];
          });

  
          this.dataSource.data = response;
        },
      );
    });
  }
  
  
  isColumnSelected(column: string, roleName: string): boolean {
    const selectedColumns = this.selectedColumnsByRole[roleName];
    return selectedColumns ? selectedColumns.includes(column) : false;
  }
  toggleColumnSelection(event: MatCheckboxChange, column: string, user: any) {
    const selectedColumns = this.selectedColumnsByRole[user.RoleName];
  
    if (!selectedColumns) {
      return;
    }
  
    if (event.checked) {
      // Add the column to the selected columns for the role
      selectedColumns.push(column);
    } else {
      // Remove the column from the selected columns for the role
      const columnIndex = selectedColumns.indexOf(column);
      if (columnIndex !== -1) {
        selectedColumns.splice(columnIndex, 1);
      }
    }
  
    // Save the updated selected columns to your API
    this.saveSelectedColumnsToAPI(user.roleId, user.RoleName, selectedColumns);
  }
  
  saveSelectedColumnsToAPI(roleId: number, roleName: string, selectedColumns: string[]) {
    // Create a payload to send to the API
    const payload = {
      RoleName: roleName,
      DefaultColumns: selectedColumns.join(','), // Convert selected columns back to a comma-separated string
    };
    console.log(payload);
    // Construct the API URL with roleId in the URL
    const apiUrl = `https://localhost:7247/api/Access/update/${roleId}`;
  
    // Send the payload to your API to update the selected columns for the role
    this.http.put(apiUrl, payload).subscribe(
      (response: any) => {
        // Handle the API response if needed
      },
      (error: any) => {
        // Handle errors if needed
      }
    );
  }
  
  goBack() {
    window.history.back();
  }

  openEditForm(data: any) {
    this.router.navigateByUrl(`view-form/${data.empId}`);
  }
 
}
