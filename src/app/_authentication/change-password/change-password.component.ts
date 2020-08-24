import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../_services/authentication.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  subscriptions: Array<Subscription> = [];

  form: FormGroup;
  invalidToken: boolean;
  httpLoading: boolean;

  token: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
    this.buildForm();
    this.handleToken();
  }

  ngOnInit(): void {

  }

  public buildForm(): void {
    this.form = this.formBuilder.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    });
  }

  public submitForm(): void {
    const data = {
      password: this.form.controls.password.value,
      token: this.token
    };

    const subscription = this.authenticationService
      .updatePassword(data)
      .subscribe(response => this.handleSuccessResponse(response));

    this.subscriptions.push(subscription);
  }

  public handleSuccessResponse(response: any): any {
    let messageErro;

    switch (response.code) {
      // Success
      case 0:
        return this.router.navigateByUrl('/login');
      // Not updated, toke has expired
      case 1:
        messageErro = 'Token expirado, solicite novamente.';
        break;
      // Token already used
      case 2:
        messageErro = 'Token já utilizado, solicite novamente.';
        break;
      // Token not exist
      case 3:
        messageErro = 'Token não existe.';
        break;
    }

    Swal.fire({
      icon: 'error',
      text: messageErro
    });
  }

  public handleToken(): void {
    this.token = this.route.snapshot.queryParams.token;

    if (!this.token) {
      this.router.navigateByUrl('/404').then();
    }
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  get confirmPassword(): AbstractControl {
    return this.form.get('confirmPassword');
  }

}
