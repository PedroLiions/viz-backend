import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthenticationService} from '../../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  env = environment;

  /*
  * Dom State
  * */
  loginLoading: boolean;
  invalidLogin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [
        Validators.required,
        Validators.email
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(14)
      ]]
    });
  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  async submitForm(): Promise<any> {
    if (this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched();
    }

    this.loginLoading = true;

    const formData = this.loginForm.value;

    await this.authenticationService.login(formData)
      .subscribe(
        response => this.authenticationService.saveCredentials(response),
          err => this.callbackErrorLogin());
  }

  public callbackErrorLogin(): void {
    this.loginLoading = false;
    this.invalidLogin = true;
  }

}
