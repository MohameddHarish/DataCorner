import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  ngOnInit() {
    this.myForm = this.fb.group({
      assetNo: ['', Validators.required],
      empId: ['', Validators.required],
      empName: ['', Validators.required],
      allocatedOn: ['', Validators.required],
      allocateRemarks: ['', Validators.required],
    });
  
    // Get the assetNo from the queryParams
    this.route.queryParams.subscribe((params) => {
      const assetNo = params['assetNo'];
  
      // Use assetNo as needed, e.g., populate the assetNo form control
      if (assetNo) {
        this.myForm.patchValue({ assetNo: assetNo });
      }
    });
  
    this.userRole = this.authenticationService.getUserRole();
  }
  
  

onSubmit() {
  if (this.myForm.valid) {
    const formData = { ...this.myForm.value };
    const apiURL = environment.baseUrl + 'api/assethistory/Allocate';
    this.http.post(apiURL, formData)
      .subscribe(
        (response) => {
          console.log('Post request successful', response);
          this.snackBar.open('Allocation successful', 'Close', { duration: 3000 });
          this.router.navigateByUrl('/assettable')
        },
        (error) => {

        }
      );
  }
}


  goBack() {
    window.history.back();
  }
}
