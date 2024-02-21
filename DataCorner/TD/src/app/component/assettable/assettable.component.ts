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
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { DeleteConfirmationDialogComponentComponent } from '../delete-confirmation-dialog-component/delete-confirmation-dialog-component.component';
import * as XLSX from 'xlsx';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-assettable',
  templateUrl: './assettable.component.html',
  styleUrls: ['./assettable.component.scss'],
})
export class AssettableComponent implements OnInit {
  private dialogRef!: MatDialog;
  dataSource = new MatTableDataSource<Asset>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  userRole:string ='';
  displayedColumns: string[] = ['serialNumber', 'assetNo', 'location', 'brand', 'modelNo', 'issues', 'assetGroup', 'assetType', 'description',
'assetStatus', 'serialNo', 'purchaseDate', 'invoiceNo', 'originalValue', 'currentValue', 'warranty', 'remarks', 'status', 'View/Edit', 'Delete'];
        showColumns: boolean = false;
  selectedColumns: string[] = this.displayedColumns;
  columns: string[] = ['serialNumber', 'assetNo', 'location', 'brand', 'modelNo', 'issues', 'assetGroup', 'assetType','description','assetStatus',
  'serialNo',
  'purchaseDate',
  'invoiceNo',
  'originalValue',
  'currentValue',
  'warranty',
  'remarks','status','View/Edit','Delete'];	
  selectedRows: any[] = [];
  statusColumn = 'status';

  [key: string]: any
  constructor(
    private http: HttpClient,
    public router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.dialogRef = dialog;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const assetType = params['assetType'];
      // Use assetType as needed
    });
    this.getDataForDashboard();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    //this.dataSource.sort=this.sort;
  }
  updateUserProperty(user: any, column: string, event: any) {
    const newValue = event.target.value; 
    user[column] = newValue;
  }
  
  goBack() {
    this.router.navigate(['dashboard']);
  }

  assetAdd() {
    this.router.navigateByUrl('asset-management');
  } 

  getDataFromAPI(assetType: string) {
    const apiURL = environment.baseUrl + `api/AssetList/${assetType}`;
  
    return this.http.get<Asset[]>(apiURL);
  }
  

  getDataForDashboard() {
    this.route.params.subscribe(params => {
      const assetType = params['assetType'];
  
      if (assetType) {
        this.getDataFromAPI(assetType).subscribe(
          (data: Asset[]) => {
            data.forEach(user => {
              user['showStatusButton'] = true; // Set showStatusButton to true for each row
              user['allocationAction'] = user.assetStatus === 'Issued' ? 'Return' : 'Allocate'; // Set initial action
            });
            this.dataSource.data = data;
            console.log(data);
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
      } else {
        console.error('AssetType parameter not found.');
      }
    });
  }
  

  onCardClicked() {
    this.getDataForDashboard();
  }

  openEditForm(data: any) {
    this.router.navigateByUrl(`view-form/${data.empId}`);
  }
  performAction(row: any) {
    // Assuming row has the necessary data, including assetNo
    const assetNo = row?.assetNo;
  
    // Check if assetNo is a valid string
    if (!assetNo) {
      console.error('Invalid assetNo:', assetNo);
      return;
    }

    // Construct the URL with the assetNo parameter
    const url = environment.baseUrl+`/api/assets/getAssetDetails?assetNo=${assetNo}&flag=2`;
  
    // Navigate to the constructed URL
    this.router.navigate(['asset-management'], { queryParams: { assetNo: assetNo, flag: 2 } });
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
    const assetType = this.route.snapshot.params['assetType'];
    const apiURL =  environment.baseUrl + `api/AssetList/${assetType}`;

    this.http.get<Asset[]>(apiURL).subscribe(
      (data: Asset[]) => {
        //const columnsToInclude = this.selectedColumns;
        const columnsToExclude = ['select', 'serialNumber', 'View/Edit', 'submit','status','Delete'];
  
        // Use the selected columns excluding the ones to exclude
        const columnsToInclude = this.selectedColumns.filter(column => !columnsToExclude.includes(column));
  
        const serialNumberColumn = 'Serial Number';

        const filteredData = data.map((item,index) => {
          const filteredItem: any = {
            [serialNumberColumn]: index + 1,
          };
          columnsToInclude.forEach((column) => {
            filteredItem[column] = item[column];
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
    if (!data.length) {
      return [];
    }
  
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
  toggleAllColumns(event: MatCheckboxChange) {
    this.showColumns = event.checked;

    if (this.showColumns) {
      this.selectedColumns = this.columns;
      console.log(this.selectedColumns);
      
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
      this.selectedColumns = ['serialNumber', 'assetNo', 'empId', 'empName','brand', 'modelNo', 'issues', 'assetGroup', 'assetType','description','assetStatus','View/Edit'];
    }
  }

  deleteUser(user: any) {
    const dialogRef = this.dialogRef.open(DeleteConfirmationDialogComponentComponent, {
      width: '400px',
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const assetNo = user.assetNo;
  
        const apiURL = `${environment.baseUrl}api/assets/${assetNo}`;
  
        this.http.delete(apiURL).subscribe(
          () => {
            console.log(`Asset with AssetNo ${assetNo} deleted successfully.`);
            
            // Remove the deleted asset from the table
            const index = this.dataSource.data.findIndex((asset) => asset['assetNo'] === assetNo);
            if (index !== -1) {
              this.dataSource.data.splice(index, 1);
              this.dataSource._updateChangeSubscription(); // Update the table
            }
  
            this.snackBar.open(`Asset with AssetNo ${assetNo} deleted successfully.`, 'OK', { duration: 3000 });
          },
          (error) => {
            console.error(`Failed to delete asset with AssetNo ${assetNo}.`);
            // this.snackBar.open(`Failed to delete asset with AssetNo ${assetNo}.`, 'OK', { duration: 3000 });
            this.snackBar.open(`Asset with AssetNo ${assetNo} deleted successfully.`, 'OK', { duration: 3000,verticalPosition: 'top' });
            this.getDataForDashboard();
          }
        );
      }
    });
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
      const apiURL = environment.baseUrl + 'api/assets';
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
   
  }
  isColumnVisible(column: string): boolean {
    return this.selectedColumns.includes(column);
  }
  performStatusAction(row: any) {
    // Determine the action based on the assetStatus
    if (row.assetStatus === 'Issued') {
      row.allocationAction = 'Return';
      this.router.navigate(['Return'],{ queryParams: { assetNo: row.assetNo } });
    } else {
      row.allocationAction = 'Allocate';
      // Navigate to AssetAllocateFormComponent and pass assetNo in queryParams
      this.router.navigate(['Allocate'], { queryParams: { assetNo: row.assetNo } });
    }
  
    // Your logic for the status button click
    console.log(`${row.allocationAction} button clicked for:`, row);
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
    const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const worksheet: any = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  
    console.log('Processed Excel Data:', worksheet);
  
    // Mark each imported row as selected
    this.selectedRows = [...this.selectedRows, ...worksheet];
  
    // Add the imported data to your table's data source
    this.dataSource.data = [...this.dataSource.data, ...worksheet];
    this['cdr'].detectChanges();
  }
  convertDateToCustomFormat(date: string): string {
    const parts = date.split('-'); // Assuming date format is 'YYYY-MM-DD'
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];
    return `${day}-${month}-${year}`;
  }
  
  uploadData(): void {
    for (const rowData of this.selectedRows) {
      // Clone the row data to avoid modifying the original values
      const formData = { ...rowData };

      // Convert the purchaseDate to the desired format (DD-MM-YYYY) for submission
      formData.purchaseDate = this.convertDateToCustomFormat(formData.purchaseDate);

      // Convert numeric values to strings if required
      formData.originalValue = formData.originalValue.toString();
      formData.currentValue = formData.currentValue.toString();

      const apiURL = environment.baseUrl + 'api/assets';

      this.http.post(apiURL, formData).subscribe(
        (response) => {
          console.log('Row data submitted successfully:', response);
          // Remove the updated row from selectedRows
          const index = this.selectedRows.findIndex((selectedRow) => selectedRow.assetNo === formData.assetNo);
          if (index !== -1) {
            this.selectedRows.splice(index, 1);
          }
        },
        (error) => {
          console.error('Error submitting row data:', error);
        }
      );
    }
    // Show a message or perform any action after all rows are uploaded
  }
  
  
  
}





