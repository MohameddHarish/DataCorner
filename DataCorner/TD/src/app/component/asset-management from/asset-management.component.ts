import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { environment } from 'src/environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-asset-management',
  templateUrl: './asset-management.component.html',
  styleUrls: ['./asset-management.component.scss']
})
export class AssetManagementComponent implements OnInit {
  myForm!: FormGroup;
  userRole = '';
  isUpdateMode = false;
  visibleFields: string[] = [];
  assetTypeOptions: string[] = ['Laptop', 'Charger', 'Mouse', 'Phone', 'SIM card', 'VOIP phone', 'Magicjack', 'Monitor'];
  locationOptions: string[] = ['Guindy', 'Mepz', 'Tidel', 'Tanjore', 'Client Location / WFH'];
  assetStatusOptions: string[]= ['Issued','Available','Under Repair','Decommissioned','Damaged'];
  assetGroupOptions: string[] = ['Admin Asset'];
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
        this.getAssetData(assetNo);
      } else {
       
        this.createForm();
      }

      this.userRole = this.authenticationService.getUserRole();
    });
  }

  private createForm(): void {
    this.myForm = this.fb.group({
      // empId: ['', Validators.required],
      // empName: ['', Validators.required],
      assetNo: ['', Validators.required],
      brand: ['', Validators.required],
      modelNo: ['', Validators.required],
      issues: ['', Validators.required],
      location: ['', Validators.required],
      assetGroup:['Admin Asset'],
      assetType:[''],
      description:[''],
      assetStatus:[''],
      serialNo:[''],
      purchaseDate:[''],
      invoiceNo:[''],
      originalValue:[''],
      currentValue:[''],
      warranty:[''],
      remarks:[''],

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
  
          // Create a function to handle date conversion
          const convertToDate = (dateString: string | undefined): Date | null => {
            if (!dateString) {
              return null;
            }
  
            const [day, month, year] = dateString.split('-').map(Number);
            // Months in JavaScript are zero-based, so subtract 1 from the month
            return new Date(year, month - 1, day);
          };
  
          this.myForm.patchValue({
            // ... (other fields)
            assetNo: assetData.assetNo,
            brand: assetData.brand,
            modelNo: assetData.modelNo,
            issues: assetData.issues,
            location: assetData.location,
            assetGroup: assetData.assetGroup,
            assetType: assetData.assetType,
            description: assetData.description,
            assetStatus: assetData.assetStatus,
            serialNo: assetData.serialNo,
            purchaseDate: convertToDate(assetData.purchaseDate),
            invoiceNo: assetData.invoiceNo,
            originalValue: assetData.originalValue,
            currentValue: assetData.currentValue,
            warranty: assetData.warranty,
            remarks: assetData.remarks,
          });
        } else {
          console.error('No asset data found for the provided assetNo.');
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
      // Clone the form data to avoid modifying the original form values
      const formData = { ...this.myForm.value };
  
      // Convert the purchaseDate to the desired format (DD-MM-YYYY) for submission
      formData.purchaseDate = this.convertDateToCustomFormat(formData.purchaseDate);
  
      const apiURL = environment.baseUrl + 'api/assets';
  
      this.http.post(apiURL, formData).subscribe(
        (response) => {
          console.log('Form data submitted successfully:', response);
          const category = formData.category;
          this.router.navigateByUrl('assets/' + category);
          this.showRowUpdatedSnackbar();
          window.location.reload();
        },
        (error) => {
          console.error('Error sending data:', error);
        }
      );
    }
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
  
}