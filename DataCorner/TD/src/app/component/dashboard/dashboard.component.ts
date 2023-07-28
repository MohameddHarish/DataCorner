import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { DashboardService } from 'src/app/service/dashboard.service';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userRole: string = '';
  cardData: any;
  tableData: any[] = [];
  userId: any;


  

  constructor(
   private dashboardService:DashboardService,
    private authService: AuthenticationService,
    private employeeService : EmployeeService,
    private route: ActivatedRoute,
    public router: Router,
    
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
    
      this.userRole = this.authService.getUserRole(); // Get the user role from the authentication service
    this.fetchDashboardData();
  });
}
  fetchDashboardData() {
    this.dashboardService.getDashboardData().subscribe(
      (data) => {
        this.cardData = data[0];
      },
      (error) => {
        console.error('Error fetching dashboard data:', error);
      }
    );
  }

  billable(UserId: number) {
    this.router.navigate(['employee', this.userId]); 
  }

  nonbillableDeploy(UserId: number)
  {
    this.router.navigate(['nonbillabledeploy',this.userId]);


}
nonbillableA(UserId: number)
{
  this.router.navigate(['nonbillablea',this.userId]);


}

nonbillableDeployA(UserId: number)
{
  this.router.navigate(['nonbillabledeploya',this.userId]);


}

nonbillableNonUtilize(UserId: number)
{
  this.router.navigate(['nonbillablenonutilize',this.userId]);


}
 

}