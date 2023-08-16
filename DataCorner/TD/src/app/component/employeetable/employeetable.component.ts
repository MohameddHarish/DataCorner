import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { WorkBook, utils, write } from 'xlsx';
import { environment } from 'src/environments/environment.development';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-employeetable',
  templateUrl: './employeetable.component.html',
  styleUrls: ['./employeetable.component.scss']
})
export class EmployeetableComponent implements OnInit {
  userId!: number;
  category: any;
  userPosts: any[] = [];
  isUpdateMode: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['serialNumber', 'id', 'name','Email','Phone', 'actions'];
  userRole: string = '';
  dashboardData: { [category: string]: any[] } = {};
  showColumns: boolean = false; // For controlling checkbox state
  selectedColumns: string[] = this.displayedColumns; // Initially, show selected columns
  columns: string[] = ['serialNumber', 'id', 'name', 'Email', 'Phone', 'SkillSet', 'Months_in_SS', 'doj', 'project_Id','project_Name', 'category', 'pcd', 'prospects', 'reportingTo', 'division_id','division','sub_Div', 'yop', 'education', 'prev_Exp', 'leadName', 'location','contact', 'project_Experience', 'top', 'tcd', 'dot', 'batch','skill_Catagories','skill_Clusters', 'actions'];

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
      this.getDataForDashboard(this.category);
    });
  }
    
  

  goBack() {
    window.history.back();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getDataFromAPI(category: string) {
    const apiURL = environment.baseUrl + `api/Trainee?category=${category}&search=""`;

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
    this.router.navigateByUrl(`view-form/${data.empId}`);
  }

  addForm() {
    this.isUpdateMode = false;
    this.router.navigateByUrl('view-form/add');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const keywords = filterValue
      .split(',')
      .map((keyword) => keyword.trim().toLowerCase());
  
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const searchData = filter.split(',');
  
      return searchData.every((keyword) =>
        Object.values(data).some((value) => {
          if (typeof value === 'number') {
            value = value.toString(); // Convert number to string for search
          }
  
          return (
            (typeof value === 'string' || value instanceof String) &&
            value.toLowerCase().includes(keyword)
          );
        })
      );
    };
  
    this.dataSource.filter = keywords.join(',');
  }
  toggleAllColumns(event: MatCheckboxChange) {
    this.showColumns = event.checked;

    if (this.showColumns) {
      this.selectedColumns = this.columns;
    } else {
      this.selectedColumns = this.displayedColumns;
    }
  }

  toggleColumns() {
    if (this.showColumns) {
      this.selectedColumns = this.displayedColumns;
    } else {
      this.selectedColumns = ['serialNumber', 'id', 'name','Email','Phone', 'SkillSet', 'Months_in_SS', 'actions'];
    }
  }

  isColumnVisible(column: string): boolean {
    return this.selectedColumns.includes(column);
  }

  downloadExcel() {
    const category = this.route.snapshot.params['category'];
    const apiURL = environment.baseUrl + `api/Trainee?category=${category}&search=""`;

    this.http.get<any[]>(apiURL).subscribe(
      (data: any[]) => {
        const worksheet = this.formatDataToWorksheet(data);
        var currentdate = new Date();
        const filename = `Report_${category}_${currentdate.getDate()}-${currentdate.getMonth() + 1}-${currentdate.getFullYear()}`;
        this.downloadExce(worksheet, filename);
      },
      (error) => {
        console.error('Error fetching API data:', error);
      }
    );
  }

  private formatDataToWorksheet(data: any[]): any[] {
    const worksheet: any[] = [];
    const headers = Object.keys(data[0]);
    worksheet.push(headers);

    data.forEach((item) => {
      const row: any[] = [];
      headers.forEach((header) => {
        row.push(item[header]);
      });
      worksheet.push(row);
    });

    return worksheet;
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
