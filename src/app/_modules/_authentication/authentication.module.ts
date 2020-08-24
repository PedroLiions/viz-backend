import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationRoutingModule} from './authentication-routing.module';


import {SharedModule} from '../_shared/shared.module';
import {ChangePasswordComponent} from '../../_authentication/change-password/change-password.component';

@NgModule({
  declarations: [
  ChangePasswordComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule
  ]
})
export class AuthenticationModule {
}
