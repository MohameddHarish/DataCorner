import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { WorkBook, utils, write } from 'xlsx';

@Component({
  selector: 'app-employeetable',
  templateUrl: './employeetable.component.html',
  styleUrls: ['./employeetable.component.scss']
})
export class EmployeetableComponent implements OnInit {
  userId!: number;
  category:any;
  userPosts: any[] = [];
  isUpdateMode: boolean = false;
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
      this.category = params['category'];
      this.getDataForDashboard(this.category);
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
        console.log(data);
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
   
    this.router.navigateByUrl(`view-form/${data.empId}`);
  }

  addForm() {
    this.isUpdateMode = false;
  this.router.navigateByUrl('view-form/add');
    // this.router.navigateByUrl('view-form');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // exportToExcel() {
  //   this.getDataForDashboard(this.category)

  // }

  // Method to convert API response to Excel worksheet
private formatDataToWorksheet(data: any[]): any[] {
  // Assuming data is an array of objects with key-value pairs
  const worksheet: any[] = [];

  // Add header row
  const headers = Object.keys(data[0]);
  worksheet.push(headers);

  // Add data rows
  data.forEach((item) => {
    const row: any[] = [];
    headers.forEach((header) => {
      row.push(item[header]);
    });
    worksheet.push(row);
  });

  return worksheet;
}

// Method to download the API response as Excel workbook

  downloadExcel() {
    const category = this.route.snapshot.params['category'];
  const apiURL = `https://localhost:7247/api/Trainee?category=${category}&search=""`;

  this.http.get<any[]>(apiURL).subscribe(
    (data: any[]) => {
      const worksheet = this.formatDataToWorksheet(data);
      var currentdate = new Date(); 
      var curentmonth 
      const filename = `Report_${category}_${currentdate.getDate()}-${currentdate.getMonth()+1}-${currentdate.getFullYear()}`;
      this.downloadExce(worksheet, filename);
    },
    (error) => {
      console.error('Error fetching API data:', error);
    }
  );
}
private downloadExce(worksheet: any[], filename: string): void {
  const workbook: WorkBook = { SheetNames: ['data'], Sheets: { data: utils.aoa_to_sheet(worksheet) } };
  const excelBuffer: any = write(workbook, { bookType: 'xlsx', type: 'array' });
  const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(data);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename + '.xlsx';
  a.click();
  window.URL.revokeObjectURL(url);
}
}
