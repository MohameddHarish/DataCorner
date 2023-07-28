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

      const roleId = this.authService.validateCredentials(enteredUsername, enteredPassword);

      if (roleId !== null) {
        this.authService.setCurrentUser({ username: enteredUsername, roleId: roleId });
        console.log('Login successful!');
        this.router.navigate(['dashboard', { id: roleId }]);
      } else {
        console.log('Invalid username or password.');
      }
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
