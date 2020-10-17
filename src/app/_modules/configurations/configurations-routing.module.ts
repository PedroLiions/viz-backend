import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from '../../_components/modules/configurations/users/users.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ConfigurationsRoutingModule {
}
