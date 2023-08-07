import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.scss']
})
export class InfoPopupComponent {
  displayedColumns: string[] = ['division_id', 'division', 'sub_div', 'skill_categories', 'skill_clusters'];
  dataSource: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<InfoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    this.loadDivisionDetails();
  }

  loadDivisionDetails(): void {
    this.http.get<any[]>('https://localhost:7247/api/Division/GetDivisionDetails').subscribe(data => {
      this.dataSource = data;
    });
  }
}
