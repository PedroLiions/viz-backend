import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationRoutingModule} from './authentication-routing.module';

import {LoginComponent} from '../../_authentication/login/login.component';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class AuthenticationModule {
}
