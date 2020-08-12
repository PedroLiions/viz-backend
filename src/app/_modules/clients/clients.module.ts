import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientsRoutingModule} from './clients-routing.module';
import { ClientsComponent } from '../../_components/modules/clients/clients.component';
import { ClientFormComponent } from '../../_components/modules/clients/client-form/client-form.component';


@NgModule({
  declarations: [ClientsComponent, ClientFormComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule
  ]
})
export class ClientsModule {
}
