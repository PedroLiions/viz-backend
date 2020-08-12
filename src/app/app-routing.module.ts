import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DefaultLayoutComponent} from './_components/_layout/default-layout/default-layout.component';
import {HomeComponent} from './_components/components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'dashboards',
        loadChildren:
          () => import('./_modules/dashboards/dashboards.module.js')
            .then(m => m.DashboardsModule)
      },
      {
        path: 'clients',
        loadChildren:
          () => import('./_modules/clients/clients.module')
            .then(m => m.ClientsModule)
      }
    ]
  },
  {
    path: 'login',
    children: [
      {
        path: '',
        loadChildren:
          () => import('./_modules/_authentication/authentication.module')
            .then(m => m.AuthenticationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
