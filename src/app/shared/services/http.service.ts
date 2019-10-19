import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  getRequest(endpoint, baseUrl = this.baseUrl) {
    return this.http.get(baseUrl + endpoint);
  }

  getRequestWithParams(endpoint, params = {}, baseUrl = this.baseUrl) {
    return this.http.get(baseUrl + endpoint, { params })
  }
}
