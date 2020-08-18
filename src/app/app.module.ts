/* modules */
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';

/* configs model */
import {JwtModuleOptions} from '@auth0/angular-jwt/lib/angular-jwt.module';

/* components */
import {AppComponent} from './app.component';
import {AsideComponent} from './_components/_layout/aside/aside.component';
import {DefaultLayoutComponent} from './_components/_layout/default-layout/default-layout.component';
import {SearchComponent} from './_components/_layout/search/search.component';
import {RightNavComponent} from './_components/_layout/right-nav/right-nav.component';
import {BreadcrumbComponent} from './_components/_components/breadcrumb/breadcrumb.component';
import { HomeComponent } from './_components/components/home/home.component';

import {AuthUnauthenticate} from './_interptor/AuthUnauthenticate';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './_authentication/login/login.component';
import {SharedModule} from './_modules/_shared/shared.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateModuleConfig} from '@ngx-translate/core/public_api';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    SearchComponent,
    AsideComponent,
    RightNavComponent,
    BreadcrumbComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(translateModuleConfig()),
    JwtModule.forRoot(jwtModuleConfig())
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthUnauthenticate,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

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
      skipWhenExpired: true,
      tokenGetter: () => localStorage.getItem('access_token'),
      allowedDomains: ['127.0.0.1:8000'],
      disallowedRoutes: [
        '127.0.0.1:8000/api/auth/login',
        '127.0.0.1:8000/api/auth/register',
      ]
    }
  };
}
