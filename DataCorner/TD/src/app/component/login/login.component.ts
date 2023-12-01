import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  passwordVisible: boolean = false;
  loginForm: FormGroup;
  showSpinner: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]  // Change 'pwd' to 'password'
    });    
  }

  ngOnInit() {}

  login() {
    if (this.loginForm.valid) {
      const enteredUsername = this.loginForm.value.username;
      const enteredPassword = this.loginForm.value.password;


      this.showSpinner = true;

      this.authService.validateCredentials(enteredUsername, enteredPassword)
        .subscribe(
          (response) => {
            if (response.success) {
              console.log(response);
              //const roleId = response.data.isAdmin === 'Admin' ? 1 : 0;
              const roleId = response.data.roleId;
              console.log(roleId);
              //const msg = roleId === 1 ? 'admin' : 'user';
              const msg = response.data.userName;
              this.snackBar.open(`Login successful as ${msg}.`, 'Close', {
                duration: 3000,
                verticalPosition: 'top' 
              });
              this.authService.setCurrentUser({ username: enteredUsername, roleId: roleId });
              this.router.navigate(['dashboard', { roleId: roleId }]); // Use roleId here
            } else {
              this.snackBar.open('Invalid username or password.', 'Close', {
                duration: 3000,
                verticalPosition: 'top'
              });
            }
            this.showSpinner = false;
          },
          (error) => {
            console.error('Login failed:', error);
            this.snackBar.open('An error occurred during login.', 'Close', {
              duration: 3000,
              verticalPosition: 'top' 
            });
            this.showSpinner = false;
          }
        );
    }
  }
  
  togglePasswordVisibility() {
    console.log('Toggle Password Visibility');
    this.passwordVisible = !this.passwordVisible;
  }  
}
