import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-popup',
  templateUrl: './project-popup.component.html',
  styleUrls: ['./project-popup.component.scss']
})
export class ProjectPopupComponent {
  displayedColumns: string[] = ['EmpId', 'Project_Id', 'ProjectName', 'TOP', 'Project_Skill','Project_Role','Role_Description','ReportingPerson'];
  dataSource: any[] = [];
  employeeId: any;

  constructor(
    public dialogRef: MatDialogRef<ProjectPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {
    this.employeeId = this.data[0];
    this.loadProjectDetails(this.employeeId);
    // this.route.params.subscribe(params => {

    //   const employeeIdParam = params['id'];
    //   const employeeId = +employeeIdParam;
    //   this.loadProjectDetails(employeeId)
    // });
  }

  loadProjectDetails(employeeId: number): void {
    this.http.get<any[]>(`https://localhost:7247/api/trainee/GetProjectHistory/${employeeId}`).subscribe(data => {
      this.dataSource = data;
    });
    
  }

}
