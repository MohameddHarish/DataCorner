import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  showSpinner: boolean = false; // Step 1: Add the showSpinner property

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private http: HttpClient
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

    //   const username = this.loginForm.value.username;
    // const password = this.loginForm.value.password;

    // const loginData = {
    //   username: username,
    //   password: password,
    // };

    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   // You may add other headers like authorization token here if needed
    // });

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
      console.log("test1");

    }, 2000); // Simulating a 2-second delay for the login process

    console.log("test2");

    // this.http.post('backend-url/login', loginData, { headers }).subscribe(
    //   (response) => {
    //     // Handle the response from the backend (e.g., success message or user data)
    //     console.log('Login successful:', response);
    //   },
    //   (error) => {
    //     // Handle errors, if any, returned from the backend
    //     console.error('Login failed:', error);
    //   }
    // );

    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
