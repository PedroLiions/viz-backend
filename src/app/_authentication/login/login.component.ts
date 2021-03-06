import {Component, OnDestroy} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {AuthenticationService} from '../../_services/authentication.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

import Swal from 'sweetalert2';
import {HttpErrorResponse} from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  subscriptions: Array<Subscription> = [];

  loginForm: FormGroup;
  recoveryPassForm: FormGroup;

  env = environment;

  /*
  * Dom State
  * */
  loginLoading: boolean;
  invalidLogin = false;
  recoveryPassFormLoading = false;
  message: string;

  /* if exist backRoute in query param, send user to this route */
  backRoute: string;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
    this.handleQueryErrors();
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

    this.recoveryPassForm = this.formBuilder.group({
      email: [null, [
        Validators.required,
        Validators.email
      ]]
    });
  }

  handleQueryErrors(): string | void {
    const errorParams = this.activatedRoute.snapshot.queryParamMap.get('error');

    const message = this.activatedRoute.snapshot.queryParamMap.get('message');

    if (message) {
      return this.message = message;
    }

    switch (errorParams) {
      case 'sessionExpired':
        this.backRoute = this.activatedRoute.snapshot.queryParamMap.get('backRoute');
        return this.message = 'Sessão expirada, faça login novamente';
      default:
        return;
    }

  }

  getField(form, field): AbstractControl {
    return this[form].get(field);
  }

  async submitLoginForm(): Promise<any> {
    if (this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched();
    }

    this.loginLoading = true;

    const formData = this.loginForm.value;

    const obs = await this.authenticationService.login(formData)
      .subscribe(
        response => this.handleSuccessfully(response),
        err => this.handleError(err));

    this.subscriptions.push(obs);
  }

  public handleSuccessfully(response): void {
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('pages-and-permissions', JSON.stringify(response.pages));

    this.router.navigateByUrl(this.backRoute || '');
  }

  public handleError(error: HttpErrorResponse): void {
    if (error.status === 401) {
      this.message = 'Usuário ou senha incorreto';
    } else if (error.status === 0) {
      this.message = 'Problemas ao se conectar com a API, tente novamente mais tarde.';
    } else if (error.status === 500) {
      this.message = 'Erro interno, contate o suporte.';
    }

    this.loginLoading = false;
  }

  public copyMail(): void {
    /* get email from login */
    const email = this.loginForm.get('email').value;
    /* set email in recovery password */
    this.recoveryPassForm.get('email').setValue(email);
  }

  sendRecoveryForm(): void {
    this.recoveryPassFormLoading = true;
    const email = this.recoveryPassForm.get('email').value;

    const subscription = this.authenticationService.generateToken(email).subscribe(
      response => this.handleSuccessRecovery(response),
      error => this.handleErrorRecovery(error)
    );

    this.subscriptions.push(subscription);
  }

  async handleSuccessRecovery(response: any): Promise<any> {
    this.recoveryPassFormLoading = false;

    await Swal.fire({
      icon: 'success',
      text: 'Link de recuperação enviado para o e-mail'
    });

    $('#modalRecoveryPassword').modal('hide');
  }

  handleErrorRecovery(error: any): void {
    this.recoveryPassFormLoading = false;
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
