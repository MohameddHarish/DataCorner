import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  getUserRole(): string {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
