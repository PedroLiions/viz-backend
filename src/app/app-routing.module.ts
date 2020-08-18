import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DefaultLayoutComponent} from './_components/_layout/default-layout/default-layout.component';
import {HomeComponent} from './_components/components/home/home.component';
import {LoginComponent} from './_authentication/login/login.component';
import {AuthGuard} from './_guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        data: {
          title: 'Home',
          breadcrumb: []
        }
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
