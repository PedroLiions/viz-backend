import {Component, OnDestroy} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {AuthenticationService} from '../../_services/authentication.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  subscriptions: Array<Subscription> = [];

  loginForm: FormGroup;
  env = environment;

  /*
  * Dom State
  * */
  loginLoading: boolean;
  invalidLogin = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
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

    const obs = await this.authenticationService.login(formData)
      .subscribe(
        response => this.handleSuccessfully(response),
        err => this.handleError());

    this.subscriptions.push(obs);
  }

  public handleSuccessfully(response): void {
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('user', JSON.stringify(response.user));

    this.router.navigateByUrl('');
  }

  public handleError(): void {
    this.loginLoading = false;
    this.invalidLogin = true;
  }

  public ngOnDestroy(): void {
    if (!this.subscriptions.length) {
      return;
    }

    this.subscriptions.forEach(
      (subscription: Subscription) => subscription.unsubscribe()
    );
  }

}
