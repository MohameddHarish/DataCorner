import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { EmployeeService, UserData } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employeetable',
  templateUrl: './employeetable.component.html',
  styleUrls: ['./employeetable.component.scss']
})
export class EmployeetableComponent implements OnInit {
  userId!: number;
  userPosts: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource<UserData>([]);
  displayedColumns: any[] = ['serialNumber', 'id', 'name', 'Email', 'Phone', 'SkillSet', 'Months_in_SS', 'actions'];
  userRole: string = '';

  constructor(
    private employeeService: EmployeeService,
    public router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.userRole = this.authService.getUserRole();
      // Get the user role from the AuthenticationService

      // Set the id value based on your logic or route params
      // Example: If you want BillableData (ID 1), set this.id = 1;
      // If you want NonBillableDeploy (ID 2), set this.id = 2;
      // If you want NonBillableA (ID 3), set this.id = 3;
      // If you want NonBillableDeployA (ID 4), set this.id = 4;
      // If you want NonBillableDeployNonUtilize (ID 5), set this.id = 5;
      const id = 1; // Replace 1 with the appropriate ID
      this.getTable(id);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getTable(id: number) {
    switch (id) {
      case 1:
        this.employeeService.getBillableData().subscribe((response: any) => {
          console.log(response);
          this.dataSource.data = response;
        });
        break;
      case 2:
        this.employeeService.getNonBillableDeploy().subscribe((response: any) => {
          console.log(response);
          this.dataSource.data = response;
        });
        break;
      case 3:
        this.employeeService.getNonBillableA().subscribe((response: any) => {
          console.log(response);
          this.dataSource.data = response;
        });
        break;
      case 4:
        this.employeeService.getNonBillableDeployA().subscribe((response: any) => {
          console.log(response);
          this.dataSource.data = response;
        });
        break;
      case 5:
        this.employeeService.getNonBillableDeployNonUtilize().subscribe((response: any) => {
          console.log(response);
          this.dataSource.data = response;
        });
        break;
      default:
        console.log("Invalid id");
        break;
    }
  }

  openEditForm(data: UserData) {
    this.router.navigateByUrl(`add-form/${data.id}`);
  }

  addForm() {
    this.router.navigateByUrl('add-form');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
