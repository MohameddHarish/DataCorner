import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'https://localhost:7247/api/account/login';

  private currentUser: { username: string; roleId: number } | null = null;

  constructor(private http: HttpClient) {}

  validateCredentials(username: string, password: string): Observable<any> {
    const loginData = { UserName: username, Pwd: password };

    return this.http.post<any>(this.apiUrl, loginData);
  }

  setCurrentUser(user: { username: string; roleId: number }): void {
    this.currentUser = user;
  }

  getUserRole(): string {
    return this.currentUser ? (this.currentUser.roleId === 1 ? 'admin' : 'user') : '';
  }
}
