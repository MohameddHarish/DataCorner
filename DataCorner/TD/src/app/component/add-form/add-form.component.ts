// form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';


@Component({
  selector: 'app-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {
  myForm!: FormGroup;
  userRole: string = '';

  userId!: number;
  constructor(private formBuilder: FormBuilder,private location: Location,  
     private authService: AuthenticationService,
     private route: ActivatedRoute,) { }

  ngOnInit(){  this.route.params.subscribe(params => {
    this.userId = +params['id'];
  
    this.userRole = this.authService.getUserRole();
     // Get the user role from the AuthenticationService
  });



    this.createForm();
  }

  createForm(): void {
    this.myForm = this.formBuilder.group({
      empId: ['', Validators.required],
      name: ['', Validators.required],
      doj: ['', Validators.required],
      projectId: ['', Validators.required],
      projectName: ['', Validators.required],
      category: ['', Validators.required],
      projectChangeDate: ['', Validators.required],
      prospects: ['', Validators.required],
      skillSet: ['', Validators.required],
      reportingPerson: ['', Validators.required],
      division: ['', Validators.required],
      subDiv: ['', Validators.required],
      skillCategories: ['', Validators.required],
      skillClusters: ['', Validators.required],
      yearOfPassout: ['', Validators.required],
      education: ['', Validators.required],
      prvExp: ['', Validators.required],
      leadName: ['', Validators.required],
      currentLocation: ['', Validators.required],
      projectExperience: ['', Validators.required],
      timeline: ['', Validators.required],
      trainingCompletionDate: ['', Validators.required],
      projectReleased: ['', Validators.required],
      durationOfTraining: ['', Validators.required],
      monthsInSS: ['', Validators.required],
      batch: ['', Validators.required],
      contact: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],

      // Define the remaining fields here
      // fieldN: ['', Validators.required],
    });
  }

  onSubmit(myForm: FormGroup) {
    if (this.myForm.invalid) {
      return;
    }
    console.log(myForm)
    // Handle form submission
    console.log(this.myForm.value);
  }



 
}
