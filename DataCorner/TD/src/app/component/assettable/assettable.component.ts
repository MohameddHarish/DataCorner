import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { environment } from 'src/environments/environment.development';
import { utils, WorkBook, write } from 'xlsx';

@Component({
  selector: 'app-assettable',
  templateUrl: './assettable.component.html',
  styleUrls: ['./assettable.component.scss'],
  
})
export class AssettableComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['No','AssetId', 'EmpId', 'EmpName', 'Location','Make','ModelNo','Issues','Actions'];
  selectedColumns: string[] = this.displayedColumns;
  dashboardData: { [category: string]: any[] } = {};

  ngOnInit() {
    this.getDataForDashboard();
  }

  constructor(
    private http: HttpClient,
    public router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  goBack() {
    window.history.back();
  }

   getDataFromAPI() {
    const apiURL = environment.baseUrl + 'api/Trainee?search=""'; 
    return this.http.get(apiURL);
  }

  getDataForDashboard() {
    this.getDataFromAPI().subscribe(
      (data: any) => {
        this.dataSource.data = data;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const keywords = filterValue.split(',').map((keyword) => keyword.trim().toLowerCase());

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const searchData = filter.split(',');
      return searchData.every((keyword) =>
        Object.values(data).some((value) => {
          if (typeof value === 'number') {
            value = value.toString();
          }
          return (
            (typeof value === 'string' || value instanceof String) && value.toLowerCase().includes(keyword)
          );
        })
      );
    };
    this.dataSource.filter = keywords.join(',');
  }

  downloadExcel() {
    const apiURL = environment.baseUrl + 'api/Trainee?search=""'; // Removed the category parameter

    this.http.get<any[]>(apiURL).subscribe(
      (data: any[]) => {
        const columnsToInclude = this.selectedColumns;

        const filteredData = data.map((item) => {
          const filteredItem: any = {};
          columnsToInclude.forEach((column) => {
            filteredItem[column] = item[column];
          });
          return filteredItem;
        });

        const worksheet = this.formatDataToWorksheet(filteredData);

        var currentdate = new Date();
        const filename = `Report_${currentdate.getDate()}-${currentdate.getMonth() + 1}-${currentdate.getFullYear()}`;
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
