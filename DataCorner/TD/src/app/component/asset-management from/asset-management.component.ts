  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { HttpClient } from '@angular/common/http';
  import { ActivatedRoute, Router } from '@angular/router';
  import { AuthenticationService } from 'src/app/service/authentication.service';
  import { environment } from 'src/environments/environment.development';
  import { MatSnackBar } from '@angular/material/snack-bar';
  import { AssetInfoPopupComponent } from '../asset-info-popup/asset-info-popup.component';
  import { AssetDialogData } from 'src/model/asset-info';
  import { MatDialog } from '@angular/material/dialog';


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
      private snackBar: MatSnackBar,
      private dialog:MatDialog
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
            this.myForm.patchValue({
              // empId: assetData.empId,
              // empName: assetData.empName,
              assetNo: assetData.assetNo,
              brand: assetData.brand,
              modelNo: assetData.modelNo,
              issues: assetData.issues,
              location: assetData.location,
              assetGroup:assetData.assetGroup,
              assetType:assetData.assetType,
              description:assetData.description,
              assetStatus:assetData.assetStatus,
              serialNo:assetData.serialNo,
              purchaseDate: this.convertToDate(assetData.purchaseDate),
              invoiceNo:assetData.invoiceNo,
              originalValue:assetData.originalValue,
              currentValue:assetData.currentValue,
              warranty:assetData.warranty,
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
    private convertToDate(dateString: string | undefined): Date | null {
      if (!dateString) {
        return null;
      }
    
      const [day, month, year] = dateString.split('-').map(Number);
    
      // Set a default time (e.g., 12:00 PM) for the date
      const defaultTime = '12:00:00';
      const [hour, minute, second] = defaultTime.split(':').map(Number);
    
      // Months in JavaScript are zero-based, so subtract 1 from the month
      return new Date(year, month - 1, day, hour, minute, second);
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

    openAssetPopup(event: Event): void {
      event.preventDefault(); 
  
    const assetNo = this.myForm.get('assetNo')?.value;

    const dialogData: AssetDialogData[] = [
      assetNo
    ];
    
      const dialogRef = this.dialog.open(AssetInfoPopupComponent, {
        width: '700px', 
        data: dialogData
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