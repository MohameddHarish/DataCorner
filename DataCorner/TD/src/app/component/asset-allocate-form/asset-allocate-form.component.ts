import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from 'src/app/service/authentication.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-asset-allocate-form',
  templateUrl: './asset-allocate-form.component.html',
  styleUrls: ['./asset-allocate-form.component.scss']
})
export class AssetAllocateFormComponent implements OnInit  {

 myForm!: FormGroup;
  userRole = '';
  isUpdateMode = false;
  visibleFields: string[] = [];

constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const assetNo = params['assetNo'];

      if (assetNo) {
        
        this.isUpdateMode = true;
        this.createForm();
        this. getAssetData(assetNo);
      } else {
       
        this.createForm();
      }

      this.userRole = this.authenticationService.getUserRole();
    });
  }

  
  private createForm(): void {
    this.myForm = this.fb.group({
      empId: ['', Validators.required],
      empName: ['', Validators.required],
      assetNo: ['', Validators.required],
      allocatedOn:['', Validators.required],
      allocateRemarks:['', Validators.required],

    });
  }

  isFieldVisible(fieldName: string): boolean {
    if (this.userRole === 'admin') {
      return true;
    }

    return this.visibleFields.includes(fieldName);
  }
  private getAssetData(assetNo: any): void {
    const apiURL = environment.baseUrl + `api/assets/getAssetDetails`;

    this.http.get<any[]>(apiURL, { params: { assetNo: assetNo.toString(), flag: '2' } }).subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          const assetData = data[0];
        
          this.myForm.patchValue({
            assetNo: assetData.assetNo,
            remarks:assetData.remarks,
          });
        } else {
          console.error('No asset data found for the provided empId.');
        }
      },
      (error) => {
        console.error('Error fetching asset data:', error);
      }
    );
  }
  
  goBack() {
    window.history.back();
  }
  showRowUpdatedSnackbar() {
    this.snackBar.open('Data Submited successfully', 'Close', {
      duration: 3000, 
      verticalPosition: 'top',
    });
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      const apiURL = environment.baseUrl + 'api/AssetHistory/allocate';
  
      this.http.post(apiURL, formData).subscribe(
        (response) => {
          console.log('Form data submitted successfully:', response);
          const category = formData.category;
          // this.router.navigateByUrl('assets/' + category);
          this.showRowUpdatedSnackbar();
          // window.location.reload();
        },
        (error) => {
          console.error('Error sending data:', error);
        }
      );
      
    }
  }
}