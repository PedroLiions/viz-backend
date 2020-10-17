import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from '../../_components/modules/configurations/users/users.component';
import {ConfigurationsRoutingModule} from './configurations-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import { PagesComponent } from '../../_components/modules/configurations/users/pages/pages.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [UsersComponent, PagesComponent],
  imports: [
    CommonModule,
    ConfigurationsRoutingModule,
    TranslateModule,
    FormsModule
  ]
})
export class ConfigurationsModule {

}
