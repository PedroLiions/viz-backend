import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) {
  }

  all(): Observable<any> {
    return this.http.get(`${environment.API}/users`);
  }

  pages(userId): Observable<any> {
    return this.http.get(`${environment.API}/users/pages-and-permissions/${userId}`);
  }

  updateUser(userId: number, fields: any): Observable<any> {
    return this.http.put(`${environment.API}/users/${userId}`, fields);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${environment.API}/users/${userId}`);
  }
}
