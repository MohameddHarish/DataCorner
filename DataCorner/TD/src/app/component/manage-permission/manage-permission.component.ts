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
  displayedColumns: string[] = ['RoleName','id', 'name', 'Email', 'Phone', 'SkillSet', 'Months_in_SS', 'doj', 'project_Id','project_Name', 'category', 'pcd', 'prospects', 'reportingTo', 'division_id','division','sub_Div', 'yop', 'education', 'prev_Exp', 'leadName', 'location','contact', 'project_Experience', 'top', 'tcd', 'dot', 'batch','skill_Catagories','skill_Clusters', 'actions'];
  userRole: string = '';
  selectedColumns: string[] = this.displayedColumns;
  columns: string[] = ['RoleName','serialNumber','empId', 'name', 'doj', 'project_Id', 'project_Name', 'category', 'pcd', 'prospects', 'skill_Set', 'reportingTo', 'division_id', 'division', 'sub_Div', 'skill_Catagories', 'skill_Clusters', 'yop', 'education', 'prev_Exp', 'leadName', 'location', 'project_Experience', 'top', 'tcd', 'dot', 'months_in_SS', 'batch', 'contact', 'mailId','actions'];

 
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
      this.http.get<any[]>(`https://localhost:7247/api/account`).subscribe(
        (response: any[]) => {
          const roleData = response.find(role => role.roleId === this.roleId);
          this.selectedColumns = this.roleData ? this.roleData.defaultColumns.split(',') : this.displayedColumns;

          response.forEach(user => {
            const userRole = response.find(role => role.roleId === user.roleId);
            user.RoleName = userRole ? userRole.roleName : 'Unknown Role'; // Set RoleName property
          });
          this.dataSource.data = response;
        },
      );
    });
  }  
  goBack() {
    window.history.back();
  }

  openEditForm(data: any) {
    this.router.navigateByUrl(`view-form/${data.empId}`);
  }
 
}
