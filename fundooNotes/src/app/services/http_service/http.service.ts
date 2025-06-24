import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = 'https://fundoonotes.incubation.bridgelabz.com/api/';

  constructor(private http: HttpClient) {}

  getHeader(): HttpHeaders {
    const token = localStorage.getItem('authToken') || '';
    return new HttpHeaders({ Authorization: token });
  }

  getApi(endpoint: string, headers: HttpHeaders = this.getHeader()) {
    return this.http.get(this.baseUrl + endpoint, { headers });
  }

  postApi(endpoint: string, payload: any, headers: HttpHeaders = this.getHeader()) {
    return this.http.post(this.baseUrl + endpoint, payload, { headers });
  }
}
