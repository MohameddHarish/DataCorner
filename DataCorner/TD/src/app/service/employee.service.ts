import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface UserData {
  serialNumber: number;
  id: number;
  name: string;
  Email: string;
  Phone: string;
  SkillSet: string;
  Months_in_SS: number;
  actions: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUsersWithPostCount(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/dashboard`);

  }

  // getUserPostsCount(userId: number): Observable<number> {
  //   return this.http.get<any[]>(`${this.baseUrl}/employee?id=${userId}`).pipe(
  //     map(posts => posts.length)
  //   );
  // }

  // getUserPosts(userId: number): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/employee?id=${userId}`);
  // }

  getBillableData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/employee?id=${1}`);
  }

  getNonBillableDeploy(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/employee?id=${2}`);
  }
  getNonBillableA(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/employee?id=${3}`);
  }
  getNonBillableDeployA(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/employee?id=${4}`);
  }
  getNonBillableDeployNonUtilize(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/employee?id=${5}`);
  }
}
