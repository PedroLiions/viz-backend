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
  readonly redirectAfterLogin: string = '/home';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  public login(loginData: object): Observable<any> {
    return this.http.post(`${this.API}/login`, loginData);
  }

  public saveCredentials(credentials): void {
    localStorage.setItem('access_token', credentials.token);
    localStorage.setItem('user', JSON.stringify(credentials.user));

    this.router.navigate([this.redirectAfterLogin]);
  }
}
