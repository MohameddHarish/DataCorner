import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpClient } from '@angular/common/http';

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
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns: any[] = ['serialNumber', 'EmployeeId', 'Name', 'Email', 'Phone', 'SkillSet', 'Months_in_SS', 'actions'];
  userRole: string = '';
  dashboardData: { [category: string]: any[] } = {}; 

  constructor(
    private http: HttpClient,
    public router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.userRole = this.authService.getUserRole();
      const category = params['category'];
      this.getDataForDashboard(category);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getDataFromAPI(category: string) {
    const apiURL = `https://localhost:7247/api/Trainee?category=${category}&search=""`;

    return this.http.get(apiURL);
  }

  getDataForDashboard(category: string) {
    this.getDataFromAPI(category).subscribe(
      (data: any) => {
        this.dashboardData[category] = data; 
        this.dataSource.data = this.dashboardData[category]; 
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  onCardClicked(category: string) {
    this.getDataForDashboard(category);
  }

  openEditForm(data: any) {
   
    this.router.navigateByUrl(`view-form/${data.emp_Id}`);
  }

  addForm() {
    this.router.navigateByUrl('view-form');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
