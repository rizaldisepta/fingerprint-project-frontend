// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://91.108.111.50:3000/';

  constructor(private http: HttpClient) {}

  register(email: string, fingerprint: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, fingerprint });
  }

  check(fingerprint: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/check`, { fingerprint });
  }
}
