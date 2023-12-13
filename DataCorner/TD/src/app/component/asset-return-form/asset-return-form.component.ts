import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-asset-return-form',
  templateUrl: './asset-return-form.component.html',
  styleUrls: ['./asset-return-form.component.scss']
})
export class AssetReturnFormComponent {
  myForm!: FormGroup;
  userRole = '';
  isUpdateMode = false;
  visibleFields: string[] = [];
  assetStatusOptions: string[]= ['Available','Under Repair','Decommissioned','Damaged'];
  assetHistory: {
    empId: number;
    empName: string;
    allocatedOn: any;
    allocateRemarks: string;
  } | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      assetNo: ['', Validators.required],
      empId: ['', Validators.required],
      empName: ['', Validators.required],
      allocatedOn: [null, Validators.required],
      allocateRemarks: ['', Validators.required],
      returnRemarks: ['', Validators.required],
      returnedOn: [null, Validators.required],
      newStatus: ['', Validators.required]
    });
  
    // Get the assetNo from the queryParams
    this.route.queryParams.subscribe((params) => {
      const assetNo = params['assetNo'];
    
      if (assetNo) {
        this.myForm.patchValue({ assetNo: assetNo });
    
        // Fetch asset history based on the URL
        this.fetchAssetHistory(assetNo);
      }
    });
  
    this.userRole = this.authenticationService.getUserRole();
  }
 
  // Function to convert date to custom format (DD-MM-YYYY)
  private convertDateToCustomFormat(date: Date | null): string | null {
    if (!date) {
      return null;
    }
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

  
  private fetchAssetHistory(assetNo: string) {
    const apiURL = environment.baseUrl + 'api/AssetHistory/getreturnassethistory';
    const params = { assetNo: assetNo, flag: '2' };
  
    this.http.get(apiURL, { params: params })
      .pipe(
        map((response: any) => {
          if (response && response.length > 0) {
            const assetHistoryData = response[0];
  
            // Convert 'allocatedOn' string to Date object
            assetHistoryData.allocatedOn = this.convertStringToDate(assetHistoryData.allocatedOn);
  
            // Map API response properties to form controls
            this.myForm.patchValue({
              assetNo: assetHistoryData.assetNo,
              empId: assetHistoryData.empId,
              empName: assetHistoryData.empName,
              allocatedOn: assetHistoryData.allocatedOn,
              allocateRemarks: assetHistoryData.allocateRemarks,
              returnedOn: assetHistoryData.returnedOn,
              returnRemarks: assetHistoryData.returnRemarks,
              assetStatus: assetHistoryData.newStatus
            });
          }
  
          return {
            empId: response[0]?.empId,
            empName: response[0]?.empName,
            allocatedOn: response[0]?.allocatedOn,
            allocateRemarks: response[0]?.allocateRemarks
          };
        })
      )
      .subscribe(
        (data) => {
          this.assetHistory = data;
          console.log('Asset history fetched successfully', data);
        },
        (error) => {
          console.error('Error fetching asset history', error);
          console.log('Error details:', error);
        }
      );
  }
  
  // Helper function to convert string to Date object
  private convertStringToDate(dateString: string): Date | null {
    const dateParts = dateString.split('-');
    if (dateParts.length === 3) {
      const year = parseInt(dateParts[2], 10);
      const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based
      const day = parseInt(dateParts[0], 10);
      return new Date(year, month, day);
    }
    return null;
  }
  

onSubmit() {
  if (this.myForm.valid) {
    const formData = { ...this.myForm.value };
    console.log(this.myForm);
     // Convert the allocatedOn to the desired format (DD-MM-YYYY) for submission
     formData.returnedOn = this.convertDateToCustomFormat(formData.returnedOn);
    const apiURL = environment.baseUrl + 'api/assethistory/return';
    this.http.post(apiURL, formData)
      .subscribe(
        (response) => {
          console.log('Post request successful', response);
          // this.snackBar.open('Allocation successful', 'Close', { duration: 3000 });
        },
        (error) => {
              // Inside onSubmit() method
this.router.navigateByUrl('/AssetList/All');
this.snackBar.open('Asset Returned', 'Close', { duration: 3000,verticalPosition: 'top' });
        }
      );
  }
}


  goBack() {
    window.history.back();
  }
}

