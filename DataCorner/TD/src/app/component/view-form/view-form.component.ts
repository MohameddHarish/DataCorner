// view-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { environment } from 'src/environments/environment.development';
import { MatDialog } from '@angular/material/dialog';
import { InfoPopupComponent } from '../info-popup/info-popup.component';
import { DialogData } from 'src/model/info';
interface ComponentProperties {
  batchOptions: string[];
  categoryOptions: string[];
  locationOptions: string[];
  skillSetOptions: string[];
  educationOptions: string[];
  projectidOptions: string[];
}

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.scss']
})

export class ViewFormComponent implements OnInit {
  myForm!: FormGroup; 
  userRole: string = ''; 
  isUpdateMode: boolean = false;
  batchOptions: string[] = [];
  categoryOptions: string[] = [];
  locationOptions: string[] = [];
  skillSetOptions: string[] = [];
  educationOptions: string[] = [];
  projectidOptions: string[] = [];
  dropdownMapping: { [key: number]: keyof ComponentProperties } = {
    1: 'educationOptions',
    2: 'categoryOptions',
    3: 'locationOptions',
    4: 'batchOptions',
    5: 'skillSetOptions',
    6:'projectidOptions'
  };

  constructor(private fb: FormBuilder,private router: Router, private http: HttpClient, private route: ActivatedRoute,private authenticationService: AuthenticationService,private dialog:MatDialog) {}
  
  ngOnInit(): void {
    this.getDropdownOptions();
    this.route.params.subscribe(params => {

      const employeeIdParam = params['id'];
        if (employeeIdParam === 'add') {
        // It is the "add" case, so create a new form for adding data
        this.createForm();
      } else {
        // It is an actual employee ID, so create the form for updating data and fetch the employee data
        this.isUpdateMode = true;
        this.createForm();
        const employeeId = +employeeIdParam;
        this.getEmployeeData(employeeId);
      }
    });
    this.userRole = this.authenticationService.getUserRole();
  }
  
 private getDropdownOptions(): void {
    this.getDropdownData(1);
    this.getDropdownData(2);
    this.getDropdownData(3);
    this.getDropdownData(4);
    this.getDropdownData(5);
    this.getDropdownData(6);
  }
  private createForm(): void {
    this.myForm = this.fb.group({
      emp_Id: ['', Validators.required],
      name: ['', Validators.required],
      doj: ['', Validators.required],
      project_Id: ['', Validators.required],
      // project_Name: [''],
      category: ['', Validators.required],
      pcd: [''],
      prospects: ['', Validators.required],
      skill_Set: ['', Validators.required],
      reportingTo: [''],
      division_id:[''],
      // division: ['', Validators.required],
      // sub_Div: [''],
      // skill_Catagories: [''],
      // skill_Clusters: [''],
      yop: ['', Validators.required],
      education: ['', Validators.required],
      prev_Exp: [''],
      leadName: [''],
      location: ['', Validators.required],
      project_Experience: [''],
      top: [''],
      tcd: [''],
      dot: [''],
      months_inSS: ['', Validators.required],
      batch: ['', Validators.required],
      contact: ['', Validators.required],
      mailId: ['', [Validators.required, Validators.email]],
    });
  }

  private getEmployeeData(employeeId: number): void {
    const apiURL = environment.baseUrl+`api/TraineeDetails/${employeeId}`;

    this.http.get<any[]>(apiURL).subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          const employeeData = data[0]; 
          this.myForm.patchValue({
            emp_Id: employeeData.emp_Id,
            name: employeeData.name,
            doj: employeeData.doj,
            project_Id: employeeData.project_Id,
            // project_Id:`${employeeData.project_Id} - ${employeeData.project_Name}`,
            // project_Name: employeeData.project_Name,
            category: employeeData.category,
            pcd: employeeData.pcd,
            prospects: employeeData.prospects,
            skill_Set: employeeData.skill_Set,
            reportingTo: employeeData.reportingTo,
            division_id:employeeData.division_id,
            // division: employeeData.division,
            sub_Div: employeeData.sub_Div,
            skill_Catagories: employeeData.skill_Catagories,
            skill_Clusters: employeeData.skill_Clusters,
            yop: employeeData.yop,
            education: employeeData.education,
            prev_Exp: employeeData.prev_Exp,
            leadName: employeeData.leadName || '',
            location: employeeData.location,
            project_Experience: employeeData.project_Experience || '', 
            top: employeeData.top || '', 
            tcd: employeeData.tcd || '', 
            dot: employeeData.dot || '', 
            months_inSS: employeeData.months_inSS.toString(),
            batch: employeeData.batch,
            contact: employeeData.contact,
            mailId: employeeData.mailId,
          });
        } else {
          console.error('No employee data found for the provided ID.');
        }
      },
      (error) => {
        console.error('Error fetching employee data:', error);
      }
    );
  }
  goBack() {
    window.history.back();
  }

  onSubmit(): void {
    
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      const apiURL = environment.baseUrl+'api/trainee';
      // console.log(formData);
      this.http.post(apiURL, formData).subscribe(
        (response) => {
          console.log('Form data submitted successfully:', response);
          const category = formData.category; // Assuming your form has a 'category' field
          this.router.navigateByUrl('employee/' + category); // Navigate to the desired URL after successful form submission
        },
        (error) => {
          console.error('Error submitting form data:', error);
        }
      );
    } else {
      // Handle the case when the form is not valid, if needed
    }
  }
  private getDropdownData(flag: number): void {
    const apiURL = environment.baseUrl+`api/trainee/${flag}`;

    this.http.get<any[]>(apiURL).subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          const targetProperty = this.dropdownMapping[flag];
          this[targetProperty] = data.map((item: any) => item[Object.keys(item)[0]]);
        } else {
          console.error(`No dropdown data found for flag: ${flag}`);
        }
      },
      (error) => {
        console.error(`Error fetching dropdown data for flag: ${flag}`, error);
      }
    );
  }
  openInfoPopup(event: Event): void {
    event.preventDefault(); // Prevent the default behavior (navigation)
  
    const dialogData: DialogData[] = [

    ];
  
    const dialogRef = this.dialog.open(InfoPopupComponent, {
      width: '600px', // Adjust the width as needed
      data: dialogData
    });
  }
  
  
}
