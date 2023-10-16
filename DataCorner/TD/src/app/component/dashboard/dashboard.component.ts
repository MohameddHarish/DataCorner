import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { utils, WorkBook, write } from 'xlsx';
import { environment } from 'src/environments/environment.development';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cardData: any;
  userRole: string = '';
  userId!: number;
  isUpdateMode: boolean = false;
  chartData: any = {}; // Initialize chartData as an empty object
  
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
      this.getDataFromAPI();
    });
  }

  assestdt() {
    this.isUpdateMode = false;
    this.router.navigateByUrl('assettable');
  }

  getDataFromAPI() {
    const apiURL = environment.baseUrl+'api/Dashboard/GetDashboardCount/1';

    this.http.get(apiURL).subscribe(
      (data: any) => {
        this.cardData = data;
        this.prepareChartData(); // Call prepareChartData after fetching data
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  prepareChartData() {
    this.chartData = {
      labels: ['BL', 'NBD', 'NBA', 'NBDA', 'NBNU'],
      datasets: [
        {
          label: 'Count',
          data: [
            this.cardData.billable,
            this.cardData.nonBillableDeploy,
            this.cardData.nonBillableA,
            this.cardData.nonBillableDeployA,
            this.cardData.nonBillableNonUtilize
          ],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    };
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
    const apiURL = environment.baseUrl+`api/Trainee?category=${category}&search=""`;

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