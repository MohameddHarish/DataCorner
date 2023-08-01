import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { utils, WorkBook, write } from 'xlsx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cardData: any;

  constructor(private http: HttpClient, private router: Router,private route: ActivatedRoute,) {}

  ngOnInit() {
    this.getDataFromAPI();
  }

  getDataFromAPI() {
    const apiURL = 'https://localhost:7247/api/Dashboard/GetDashboardCount/1';

    this.http.get(apiURL).subscribe(
      (data: any) => {
        this.cardData = data; 
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  onCardClicked(category: string) {
    this.router.navigateByUrl(`employee/${category}`);
  }
  


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

  downloadExcel(category: string) {
    const apiURL = `https://localhost:7247/api/Trainee?category=${category}&search=""`;

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