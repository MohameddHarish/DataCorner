import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  passwordVisible: boolean = false;
  loginForm: FormGroup;
  showSpinner: boolean = false; // Step 1: Add the showSpinner property

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  login() {
    if (this.loginForm.valid) {
      const enteredUsername = this.loginForm.value.username;
      const enteredPassword = this.loginForm.value.password;

      this.showSpinner = true; // Step 3: Show the spinner when the login button is clicked

      setTimeout(() => { // Simulate an asynchronous login process (you should use your actual login process)

      const roleId = this.authService.validateCredentials(enteredUsername, enteredPassword);


      if (roleId !== null) {
        this.authService.setCurrentUser({ username: enteredUsername, roleId: roleId });
        console.log('Login successful!');
        this.router.navigate(['dashboard', { id: roleId }]);
      } else {
        console.log('Invalid username or password.');
      }
      this.showSpinner = false;
    }, 2000); // Simulating a 2-second delay for the login process
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
