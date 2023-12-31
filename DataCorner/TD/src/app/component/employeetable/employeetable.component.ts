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
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-employeetable',
  templateUrl: './employeetable.component.html',
  styleUrls: ['./employeetable.component.scss']
})
export class EmployeetableComponent implements OnInit {
  userId!: number;
  roleId!: number;
  category: any;
  userPosts: any[] = [];
  isUpdateMode: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['serialNumber','empId', 'name', 'mailId', 'contact','skill_Set','actions'];
  userRole: string = '';
  dashboardData: { [category: string]: any[] } = {};
  showColumns: boolean = false;
  selectedColumns: string[] = this.displayedColumns;
  columns: string[] = ['serialNumber','empId', 'name', 'doj', 'project_Id', 'project_Name', 'category', 'pcd', 'prospects', 'skill_Set', 'reportingTo', 'division_id', 'division', 'sub_Div', 'skill_Catagories', 'skill_Clusters', 'yop', 'education', 'prev_Exp', 'leadName', 'location', 'project_Experience', 'top', 'tcd', 'dot', 'months_in_SS', 'batch', 'contact', 'mailId','actions'];
  
  selectedRows: any[] = [];


  constructor(
    private http: HttpClient,
    public router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
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
          this.selectedColumns = roleData ? roleData.defaultColumns.split(',') : this.displayedColumns;
          this.getDataForDashboard(this.category);
        },
        
      );
    });
    
  }  
  updateUserProperty(user: any, column: string, event: any) {
    const newValue = event.target.value; 
    user[column] = newValue;
  }
  showRowUpdatedSnackbar() {
    this.snackBar.open('Row updated successfully', 'Close', {
      duration: 3000, // The duration for which the snackbar will be displayed (in milliseconds)
      verticalPosition: 'top', // You can change the position of the snackbar
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

  addcolumns() {
    this.isUpdateMode = false;
    this.router.navigateByUrl('manage-permission');
  }

  addForm() {
    this.isUpdateMode = false;
    this.router.navigateByUrl('view-form/add');
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

  toggleAllColumns(event: MatCheckboxChange) {
    this.showColumns = event.checked;

    if (this.showColumns) {
      this.selectedColumns = this.columns;
    } else {
      this.selectedColumns = this.displayedColumns;
    }
  }
  getSerialNumber(index: number): number {
    return index + 1;
  }
  
  toggleColumns() {
    if (this.showColumns) {
      this.selectedColumns = this.displayedColumns;
    } else {
      this.selectedColumns = ['serialNumber', 'id', 'name', 'Email', 'Phone', 'SkillSet', 'Months_in_SS', 'actions'];
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
        const columnsToExclude = ['select', 'serialNumber', 'actions', 'submit'];
  
        // Use the selected columns excluding the ones to exclude
        const columnsToInclude = this.selectedColumns.filter(column => !columnsToExclude.includes(column));
  
        const serialNumberColumn = 'Serial Number';
  
        // Filter the data to include only the selected columns and add a serial number
        const filteredData = data.map((item, index) => {
          const filteredItem: any = {
            [serialNumberColumn]: index + 1, // Serial number starting from 1
          };
          columnsToInclude.forEach(column => {
            filteredItem[column] = item[column];
          });
          return filteredItem;
        });
  
        const worksheet = this.formatDataToWorksheet(filteredData);
  
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
  submit(userData: any) {
    const apiURL = environment.baseUrl + 'api/trainee';
    this.http.post(apiURL, userData).subscribe(
      (response) => {
        console.log('Data sent successfully:', response);
      },
      (error) => {
        console.error('Error sending data:', error);
      }
    );
    this.showRowUpdatedSnackbar();
  }
  toggleRowSelection(user: any) {
    const index = this.selectedRows.findIndex((selectedUser) => selectedUser.empId === user.empId);
  
    if (index === -1) {
      // User not selected, add to selectedRows
      this.selectedRows.push(user);
    } else {
      // User already selected, remove from selectedRows
      this.selectedRows.splice(index, 1);
    }
  }
  isSelected(row: any): boolean {
    console.log(row);
    return this.selectedRows.some((selectedUser) => selectedUser.empId === row.empId);
  }
  submitSelectedRows() {
    for (const user of this.selectedRows) {
      const apiURL = environment.baseUrl + 'api/trainee';
      this.http.post(apiURL, user).subscribe(
        (response) => {
          console.log('Data sent successfully:', response);
          const index = this.selectedRows.findIndex((selectedUser) => selectedUser.empId === user.empId);
          if (index !== -1) {
            this.selectedRows.splice(index, 1);
          }
        },
        (error) => {
          console.error('Error sending data:', error);
        }
      );
    }
    this.showRowUpdatedSnackbar();
  }
  handleFileInput(event: any): void {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        const data = e.target.result;
        this.processExcelData(data);
      };
  
      reader.readAsBinaryString(file);
    }
  }
  
  processExcelData(data: string): void {
    const workbook: WorkBook = XLSX.read(data, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const worksheet: any = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  
    console.log('Processed Excel Data:', worksheet);
  
    // Mark each imported row as selected
    this.selectedRows = [...this.selectedRows, ...worksheet];
  
    // Add the imported data to your table's data source
    this.dataSource.data = [...this.dataSource.data, ...worksheet];
    this.cdr.detectChanges();
  }
  
}