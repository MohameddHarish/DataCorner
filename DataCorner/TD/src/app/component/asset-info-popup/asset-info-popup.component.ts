import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment.development';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asset-info-popup',
  templateUrl: './asset-info-popup.component.html',
  styleUrls: ['./asset-info-popup.component.scss']
})
export class AssetInfoPopupComponent {
  displayedColumns: string[] = ['assetNo', 'empId', 'empName', 'allocatedOn', 'allocatRemarks','returnedOn','returnedRemarks'];
  dataSource: any[] = [];
  assetNo: any;
  constructor(
    public dialogRef: MatDialogRef<AssetInfoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.assetNo = this.data[0]
    this.loadAllocationDetails(this.assetNo);
  }

  loadAllocationDetails(assetNo:any): void {
    const apiURL = environment.baseUrl + `api/AssetHistory/getassethistory?assetNo=${assetNo}&flag=1`;
    this.http.get<any[]>(apiURL).subscribe((data: any[]) => {
      this.dataSource = data;
    });
    
  }
}
