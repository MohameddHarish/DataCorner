import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { utils, WorkBook, write } from 'xlsx';
import { environment } from 'src/environments/environment.development';
import { AuthenticationService } from 'src/app/service/authentication.service';






import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexFill,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: any;
  chart: any;
  chart1:any;
  dataLabels: any;
  plotOptions: any;
  xaxis: any;
  colors: string[];
  fill: ApexFill;
  stroke: ApexStroke;



};

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
  chartData: any = {};
  // chartData: ChartDataSets[];
  // chartOptions: ChartOptions;
  

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

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
        this.prepareChartData();
        // this.Batchart();
        console.log('Chart Data:', this.chartData);

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
          borderWidth: 1,
      
          
        }
      ]
    
    };
    
  }

//  Batchart(){
    
//   this.chartOptions = {

   
//     series: [
//       {
//         name: 'Count',
//         data: [
//           this.cardData.billable,
//           this.cardData.nonBillableDeploy,
//           this.cardData.nonBillableA,
//           this.cardData.nonBillableDeployA,
//           this.cardData.nonBillableNonUtilize
//         ],
//       }
//     ],
    
//     chart: {
//       type: "bar",
//       height: 350,
//       stacked: true
      
//     },
//     stroke: {
//       width: 1,
//       colors: ["#fff"]
//     },
//     fill: {
//       opacity: 1
//     },
   
 
//     plotOptions: {
//       bar: {
//         horizontal: false,
       
//         columnWidth: '50%',
//       },
      
//     },

//     colors: [
//       "#33b2df",
//       "#546E7A",
//       "#d4526e",
//       "#13d8aa",
//       "#A5978B",
     
//     ],
//     dataLabels: {

//       enabled: true,
      
//     },
//     xaxis: {
//       categories: ['BL', 'NBD', 'NBA', 'NBDA', 'NBNU'],
      
//     },



   

//   };

//  }
  // Colors for individual bars


  onCardClicked(category: string) {
    this.router.navigateByUrl(`employee/${category}`);
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

  downloadExcel(category: string) {
    const apiURL = environment.baseUrl+`api/Trainee?category=${category}&search=""`;

    this.http.get<any[]>(apiURL).subscribe(
      (data: any[]) => {
        const worksheet = this.formatDataToWorksheet(data);
        var currentdate = new Date();
        const filename = `Report_${category}_${currentdate.getDate()}-${currentdate.getMonth() + 1}-${currentdate.getFullYear()}`;
        this.downloadExcelFile(worksheet, filename);
      },
      (error) => {
        console.error('Error fetching API data:', error);
      } 
    );
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


