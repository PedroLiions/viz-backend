import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly env = environment;
  readonly API = `${environment.API}/auth`;

  constructor(
    private http: HttpClient
  ) {
  }

  public login(loginData: object): Observable<any> {
    return this.http.post(`${this.API}/login`, loginData);
  }

  public generateToken(email: string): Observable<any> {
    return this.http.post(`${this.API}/generate-token`, {email});
  }

  public updatePassword(data: object): Observable<any> {
    return this.http.post(`${this.API}/update-password?`, data);
  }

  public logout(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.http.post(`${this.API}/logout`, {})
        .subscribe(
          response => {
            ['token', 'user'].forEach(item => localStorage.removeItem(item));
            resolve(response);
          },
          error => reject(error)
        );
    });
  }
}
