import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
      pwd: ['', Validators.required]
    });
  }

  ngOnInit() {}

  login() {
    if (this.loginForm.valid) {
      const enteredUsername = this.loginForm.value.username;
      const enteredPassword = this.loginForm.value.pwd;

      this.showSpinner = true;

      this.authService.validateCredentials(enteredUsername, enteredPassword)
        .subscribe(
          (response) => {
            if (response.success) {
              const roleId = response.data.isAdmin === 'Admin' ? 1 : 0;
              const msg = roleId === 1 ? 'admin' : 'user';
              this.snackBar.open(`Login successful as ${msg}.`, 'Close', { duration: 3000 });
              this.authService.setCurrentUser({ username: enteredUsername, roleId: roleId });
              this.router.navigate(['dashboard', { roleId: roleId }]); // Use roleId here
            } else {
              this.snackBar.open('Invalid username or password.', 'Close', { duration: 3000 });
            }
            this.showSpinner = false;
          },
          (error) => {
            console.error('Login failed:', error);
            this.snackBar.open('An error occurred during login.', 'Close', { duration: 3000 });
            this.showSpinner = false;
          }
        );
    }
  }
  
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
