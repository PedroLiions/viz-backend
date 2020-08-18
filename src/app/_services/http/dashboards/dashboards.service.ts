import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService {

  readonly API = environment.API;

  constructor(
    private http: HttpClient
  ) { }

  public getAgentsDashboard(): Observable<any> {
    return this.http.get(`${this.API}/dashboards/agents`);
  }

  public getBestTimeDashboard(): Observable<any> {
    return this.http.get(`${this.API}/dashboards/best-time`);
  }
}
