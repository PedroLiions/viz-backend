import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService {

  readonly API = `${environment.API}/dashboards`;

  constructor(
    private http: HttpClient
  ) {
  }

  public agents(): Observable<any> {
    return this.http.get(`${this.API}/agents`);
  }

  public bestTime(): Observable<any> {
    return this.http.get(`${this.API}/best-time`);
  }

  public comparative(): Observable<any> {
    return this.http.get(`${this.API}/comparative`);
  }

  public daily(): Observable<any> {
    return this.http.get(`${this.API}/daily`);
  }

  public funnel(): Observable<any> {
    return this.http.get(`${this.API}/funnel`);
  }

  public multiChannel(): Observable<any> {
    return this.http.get(`${this.API}/multi-channel`);
  }

  public portfolio(): Observable<any> {
    return this.http.get(`${this.API}/portfolio`);
  }

  public region(): Observable<any> {
    return this.http.get(`${this.API}/region`);
  }
}
