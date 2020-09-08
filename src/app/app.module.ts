/* interceptor */
import {AuthUnauthenticate} from './_interceptor/AuthUnauthenticate';

/* modules */
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateModuleConfig} from '@ngx-translate/core/public_api';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {SharedModule} from './_modules/_shared/shared.module';

/* components */
import {AppComponent} from './app.component';
import {AsideComponent} from './_components/_layout/aside/aside.component';
import {DefaultLayoutComponent} from './_components/_layout/default-layout/default-layout.component';
import {SearchComponent} from './_components/_layout/search/search.component';
import {RightNavComponent} from './_components/_layout/right-nav/right-nav.component';
import {BreadcrumbComponent} from './_components/_components/breadcrumb/breadcrumb.component';
import {HomeComponent} from './_components/components/home/home.component';
import {LoginComponent} from './_authentication/login/login.component';
import {Error404Component} from './_components/errors/error404/error404.component';
import {JwtModule, JwtModuleOptions} from '@auth0/angular-jwt';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    SearchComponent,
    AsideComponent,
    RightNavComponent,
    BreadcrumbComponent,
    HomeComponent,
    LoginComponent,
    Error404Component
  ],
  imports: [
    HttpClientModule,
    JwtModule.forRoot(jwtModuleConfig()),
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    TranslateModule.forRoot(translateModuleConfig()),
    CarouselModule
  ],
  exports: [
    SharedModule
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthUnauthenticate,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

/*
* Translate functions and configs
*  */
export function translateModuleConfig(): TranslateModuleConfig {
  return {
    defaultLanguage: 'pt-br',
    loader: {
      provide: TranslateLoader,
      useFactory: httpLoaderFactory,
      deps: [HttpClient]
    }
  };
}

export function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

/*
* JWT function and configs
* */
export function jwtModuleConfig(): JwtModuleOptions {
  return {
    config: {
      tokenGetter: () => {
        return localStorage.getItem('access_token');
      },
      allowedDomains: [
        'localhost:8000'
      ],
      disallowedRoutes: [
        '127.0.0.1:8000/api/auth/login',
        '127.0.0.1:8000/api/auth/register',
      ]
    }
  };
}
