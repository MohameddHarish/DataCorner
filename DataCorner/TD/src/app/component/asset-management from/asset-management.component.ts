import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-asset-management',
  templateUrl: './asset-management.component.html',
  styleUrls: ['./asset-management.component.scss']
})
export class AssetManagementComponent implements OnInit {
  myForm!: FormGroup;
  userRole: string = '';
  isUpdateMode: boolean = false;
  visibleFields: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const empId = params['empId'];

      if (empId) {
        // If empId is present, fetch data for the specified empId
        this.isUpdateMode = true;
        this.createForm();
        this.getAssetData(empId);
      } else {
        // If empId is not present, it's an add operation
        this.createForm();
      }

      this.userRole = this.authenticationService.getUserRole();
    });
  }

  private createForm(): void {
    this.myForm = this.fb.group({
      EmpId: ['', Validators.required],
      EmpName: ['', Validators.required],
      AssetId: ['', Validators.required],
      Make: ['', Validators.required],
      ModelNo: ['', Validators.required],
      Issues: ['', Validators.required],
      Location: ['', Validators.required]
    });
  }
  isFieldVisible(fieldName: string): boolean {
    if (this.userRole === 'admin') {
      return true;
    }

    return this.visibleFields.includes(fieldName);
  }
  private getAssetData(empId: number): void {
    const apiURL = environment.baseUrl + `api/assets/getAssetDetails`;

    this.http.get<any[]>(apiURL, { params: { empId: empId.toString(), flag: '2' } }).subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          const assetData = data[0];
          this.myForm.patchValue({
            EmpId: assetData.empId,
            EmpName: assetData.empName,
            AssetId: assetData.assetId,
            Make: assetData.make,
            ModelNo: assetData.modelNo,
            Issues: assetData.issues,
            Location: assetData.location,
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

  onSubmit(): void {
    
    if (this.myForm.valid) {
      console.log(this.myForm);3
      const formData = this.myForm.value;
      const apiURL = environment.baseUrl+'api/assets';
      // console.log(formData);
      this.http.post(apiURL, formData).subscribe(
        (response) => {
          console.log('Form data submitted successfully:', response);
        },
        (error) => {
          console.error('Error submitting form data:', error);
        }
      );
    } else {
    }
  }
 

}

