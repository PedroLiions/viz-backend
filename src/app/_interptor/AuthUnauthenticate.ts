import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {NavigationExtras, Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Location} from '@angular/common';

@Injectable()
export class AuthUnauthenticate implements HttpInterceptor {
  constructor(
    private router: Router,
    private location: Location
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(() => {},
        (err: any) => {
          if (
            err instanceof HttpErrorResponse
            && err.status !== 401
          ) {
            return;
          }

          localStorage.clear();
          this.location.replaceState('/'); // clears browser history so they can't navigate with back button
          this.router.navigate(['login']);
        })
    );
  }

}
