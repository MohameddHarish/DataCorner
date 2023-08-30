import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { environment } from 'src/environments/environment.development';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-manage-permission',
  templateUrl: './manage-permission.component.html',
  styleUrls: ['./manage-permission.component.scss']
})
export class ManagePermissionComponent implements OnInit {

  userId!: number;
  category: any;
  userPosts: any[] = [];
  isUpdateMode: boolean = false;
  @ViewChild(MatSort) sort!: MatSort;
  dashboardData:  any[]  = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['RoleName','id', 'name', 'Email', 'Phone', 'SkillSet', 'Months_in_SS', 'doj', 'project_Id','project_Name', 'category', 'pcd', 'prospects', 'reportingTo', 'division_id','division','sub_Div', 'yop', 'education', 'prev_Exp', 'leadName', 'location','contact', 'project_Experience', 'top', 'tcd', 'dot', 'batch','skill_Catagories','skill_Clusters', 'actions'];
  userRole: string = '';
 
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
      this.getDataForDashboard();
    });
  }
    
  goBack() {
    window.history.back();
  }

  getDataFromAPI() {
    const apiURL = environment.baseUrl + `api/Account`;

    return this.http.get(apiURL);
  }

  getDataForDashboard() {
    this.getDataFromAPI().subscribe(
      (data: any) => {
        this.dashboardData = data;
        this.dataSource.data = this.dashboardData;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  onCardClicked() {
    this.getDataForDashboard();
  }


  openEditForm(data: any) {
    this.router.navigateByUrl(`view-form/${data.empId}`);
  }

}
