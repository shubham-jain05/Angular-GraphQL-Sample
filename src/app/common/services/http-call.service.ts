import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class HttpCallService {

  
  constructor(private httpClient: HttpClient) {}

  get<T>(url: string, headers: any = null): Observable<T> {
    return this.httpClient.get<T>(url, { headers: headers });
  }

  post<T, V>(url: string, body?: T, headers: any = null): Observable<V> {
    return this.httpClient.post<V>(url, body, { headers: headers });
  }

  put<T, V>(body: T, url: string, headers: any = null): Observable<V> {
    return this.httpClient.put<V>(url, body, { headers: headers });
  }

  delete<T>(url: string, headers:any = null): Observable<T> {
    return this.httpClient.delete<T>(url, { headers: headers });
  }
}
