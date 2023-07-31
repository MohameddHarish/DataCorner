// view-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.scss']
})
export class ViewFormComponent implements OnInit {
  myForm!: FormGroup; 
  userRole: string = ''; 

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.createForm();

   
    this.route.params.subscribe(params => {
      const employeeId = +params['id'];
      this.getEmployeeData(employeeId);
    });
  }

  private createForm(): void {
    this.myForm = this.fb.group({
      empId: ['', Validators.required],
      name: ['', Validators.required],
      doj: ['', Validators.required],
      project_Id: ['', Validators.required],
      project_Name: ['', Validators.required],
      category: ['', Validators.required],
      pcd: [''],
      prospects: ['', Validators.required],
      skill_Set: ['', Validators.required],
      reportingTo: [''],
      division: ['', Validators.required],
      sub_Div: [''],
      skill_Catagories: [''],
      skill_Clusters: [''],
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
    const apiURL = `https://localhost:7247/api/TraineeDetails/${employeeId}`;

    this.http.get<any[]>(apiURL).subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          const employeeData = data[0]; 
          this.myForm.patchValue({
            empId: employeeData.emp_Id,
            name: employeeData.name,
            doj: employeeData.doj,
            projectId: employeeData.project_Id,
            projectName: employeeData.project_Name,
            category: employeeData.category,
            pcd: employeeData.pcd,
            prospects: employeeData.prospects,
            skillSet: employeeData.skill_Set,
            reportingTo: employeeData.reportingTo,
            division: employeeData.division,
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
            months_inSS: employeeData.months_inSS,
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
  onSubmit(): void {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      const apiURL = 'https://localhost:7247/api/trainee';
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
