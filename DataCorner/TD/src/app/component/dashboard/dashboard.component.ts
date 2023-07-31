import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cardData: any;

  constructor(private http: HttpClient, private router: Router) {}

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
}
