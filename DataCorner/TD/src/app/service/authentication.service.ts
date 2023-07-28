import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private credentials: { username: string; password: string; roleId: number }[] = [
    { username: 'Admin', password: 'Admin@123', roleId: 1 },
    { username: 'User', password: 'User@123', roleId: 2 },
    { username: 'Ganesh', password: 'Ganesh@123', roleId: 2 }
  ];
  private currentUser: { username: string; roleId: number } | null = null;

  constructor() { }

  validateCredentials(username: string, password: string): number | null {
    const user = this.credentials.find(
      cred => cred.username === username && cred.password === password
    );

    return user ? user.roleId : null;
  }

  setCurrentUser(user: { username: string; roleId: number }): void {
    this.currentUser = user;
  }

  getUserRole(): string {
    return this.currentUser ? (this.currentUser.roleId === 1 ? 'admin' : 'user') : '';
  }
}
