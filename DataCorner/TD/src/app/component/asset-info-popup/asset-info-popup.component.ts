import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-asset-info-popup',
  templateUrl: './asset-info-popup.component.html',
  styleUrls: ['./asset-info-popup.component.scss']
})
export class AssetInfoPopupComponent {
  displayedColumns: string[] = ['assetNo', 'empId', 'empName', 'allocatedOn', 'allocatRemarks','returnedOn','returnedRemarks'];
  dataSource: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AssetInfoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    this.loadDivisionDetails();
  }

  loadDivisionDetails(): void {
    this.http.get<any[]>('https://localhost:7247/api/Division/GetDivisionDetails').subscribe((data: any[]) => {
      this.dataSource = data;
    });
    
  }
}
