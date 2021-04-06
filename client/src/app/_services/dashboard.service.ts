import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

import { Dashboard } from '../_models/dashboard';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {  }

  getDashboardData(appUserId: number): Observable<Dashboard[]>
  {
    let apiURL = `${this.baseUrl + 'dashboard/' + appUserId}`;
    return this.http.get<Dashboard[]>(apiURL);
  }

}
