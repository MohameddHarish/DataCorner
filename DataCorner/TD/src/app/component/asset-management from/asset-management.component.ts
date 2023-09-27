import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { environment } from 'src/environments/environment.development';
import { MatDialog } from '@angular/material/dialog';
import { ComponentProperties,RoleInfo } from 'src/app/interfaces/view-form-interface';


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
  roleInfo: RoleInfo | undefined;
  


  constructor(private fb: FormBuilder,
    private router: Router, 
    private http: HttpClient, 
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private dialog:MatDialog) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {

      const employeeIdParam = params['id'];
        if (employeeIdParam === 'add') {
        this.createForm();
      } else {
        this.isUpdateMode = true;
        this.createForm();
        const employeeId = +employeeIdParam;
        this.getEmployeeData(employeeId);
      }
      console.log(employeeIdParam);
    });
    this.userRole = this.authenticationService.getUserRole();
    this.http.get<RoleInfo[]>('https://localhost:7247/api/account').subscribe(
      (response: RoleInfo[]) => {
        this.roleInfo = response.find((role: RoleInfo) => role.roleName === this.userRole);
        if (this.roleInfo) {
          this.visibleFields = this.roleInfo.defaultColumns.split(',');
        }
      },
      error => {
        console.error('Error fetching role info:', error);
      }
    );
    
  }
  isFieldVisible(fieldName: string): boolean {
    if (this.userRole === 'admin') {
      return true;
    }
    if (this.roleInfo) {
      return this.roleInfo.defaultColumns.includes(fieldName);
    }
    return false;
  }  
 
  private createForm(): void {
    this.myForm = this.fb.group({
      EmpId: ['', Validators.required],
      EmpName: ['', Validators.required],
      AssetId:['',Validators.required],
      Make:['',Validators.required],
      ModelNo:['',Validators.required],
      Issues:['',Validators.required],
      Location:['',Validators.required]
    });
  }

  private getEmployeeData(employeeId: number): void {
    const apiURL = environment.baseUrl+`api/TraineeDetails/${employeeId}`;

    this.http.get<any[]>(apiURL).subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          const employeeData = data[0]; 
          this.myForm.patchValue({
            EmpId: employeeData.EmpId,
            EmpName: employeeData.EmpName,
            AssetId: employeeData.AssetId,
            Make: employeeData.Make,
            ModelNo: employeeData.ModelNo,
            Issues: employeeData.Issues,
            Location: employeeData.Location,
          });
        } else {
          console.error('No employee data found for the provided ID.');
        }
        console.log(this.myForm);
      },
      (error) => {
        console.error('Error fetching employee data:', error);
      }
    );
    console.log(employeeId)
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

