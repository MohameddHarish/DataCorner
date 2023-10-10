// assettable.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { environment } from 'src/environments/environment.development';
import { utils, WorkBook, write } from 'xlsx';
import { Asset } from 'src/app/interfaces/asset-form-interface';

@Component({
  selector: 'app-assettable',
  templateUrl: './assettable.component.html',
  styleUrls: ['./assettable.component.scss'],
})
export class AssettableComponent implements OnInit {
  dataSource = new MatTableDataSource<Asset>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['serialNumber', 'assetId', 'empId', 'empName', 'location', 'make', 'modelNo', 'issues', 'action'];
  selectedColumns: string[] = this.displayedColumns;

  constructor(
    private http: HttpClient,
    public router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getDataForDashboard();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  
  goBack() {
    window.history.back();
  }

  assetAdd() {
    this.router.navigateByUrl('asset-management');
  }

  getDataFromAPI(flag: number) {
    const apiURL = environment.baseUrl + 'api/assets/getAssetDetails';
    return this.http.get<Asset[]>(apiURL, { params: { flag: flag.toString() } });
  }

  getDataForDashboard() {
    const flag = 1;
  
    this.getDataFromAPI(flag).subscribe(
      (data: Asset[]) => {
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
  performAction(row: any) {
    // Assuming row has the necessary data, including empId
    const empId = row?.empId;
  
    // Check if empId is a valid number
    if (isNaN(empId) || empId === null) {
      console.error('Invalid empId:', empId);
      return;
    }
    // Construct the URL with the empId parameter
    const url = `https://localhost:7247/api/assets/getAssetDetails?empId=${empId}&flag=2`;
  
    // Navigate to the constructed URL
    this.router.navigate(['asset-management'], { queryParams: { empId: empId, flag: 2 } });
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
          return ((typeof value === 'string' || value instanceof String) && value.toLowerCase().includes(keyword));
        })
      );
    };
    this.dataSource.filter = keywords.join(',');
  }

  downloadExcel() {
    const apiURL = environment.baseUrl + 'api/assets/getAssetDetails';

    this.http.get<Asset[]>(apiURL).subscribe(
      (data: Asset[]) => {
        const columnsToInclude = this.selectedColumns;

        const filteredData = data.map((item) => {
          const filteredItem: any = {};
          columnsToInclude.forEach((column) => {
            // filteredItem[column] = item[column];
          });
          return filteredItem;
        });

        const worksheet = this.formatDataToWorksheet(filteredData);

        const currentDate = new Date();
        const filename = `Report_${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
        this.downloadExcelFile(worksheet, filename);
      },
      (error) => {
        console.error('Error fetching API data:', error);
      }
    );
  }
  assestAdd(){
    this.router.navigateByUrl('asset-management');
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

  private downloadExcelFile(worksheet: any[], filename: string): void {
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
