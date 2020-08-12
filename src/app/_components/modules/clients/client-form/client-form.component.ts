import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent {

  formClient: FormGroup;

  constructor(

  ) {


    // this.formClient = formBuilder.group({
    //   razao_social: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    //   nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
    // });
  }

}
