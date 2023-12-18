import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userRole: string = '';
  userId!: number;
  constructor(public router: Router,
    private authService: AuthenticationService) { }


  ngOnInit() {
    this.userRole = this.authService.getUserRole();
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
 
  Home() {
    this.router.navigate(['dashboard']);
  }

}
