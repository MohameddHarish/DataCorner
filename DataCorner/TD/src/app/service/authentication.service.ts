import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = environment.baseUrl+'api/account/login';

  private currentUser!: { username: string; roleId: number };

  private roleId !: number;

  constructor(private http: HttpClient) {}

  validateCredentials(username: string, password: string): Observable<any> {
    const loginData = { UserName: username, Pwd: password };

    return this.http.post<any>(this.apiUrl, loginData);
  }

  setCurrentUser(user: { username: string; roleId: number }): void {
    this.currentUser = user;
    sessionStorage.setItem('username',this.currentUser.username);
    sessionStorage.setItem('roleId',this.currentUser.roleId.toString())
  }

  // getUserRole(): string {
  //   const value = sessionStorage.getItem('username');
  //   this.roleId = Number(sessionStorage.getItem('roleId'));
  //   if (value)
  //     return this.currentUser ? (this.roleId == 1 ?  value: 'user') : '';
  //   else
  //     return this.currentUser ? (this.roleId == 1 ?  'admin': 'user') : '';
  // }
  getUserRole(): string {
    const value = sessionStorage.getItem('username');
    this.roleId = Number(sessionStorage.getItem('roleId'));
    if (value)
      return value;
    else
      return 'user';
  }
  
  getRoleId(): number {
    return this.roleId;
  }
}
