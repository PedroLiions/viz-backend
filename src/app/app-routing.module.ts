import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DefaultLayoutComponent} from './_components/_layout/default-layout/default-layout.component';
import {HomeComponent} from './_components/components/home/home.component';
import {LoginComponent} from './_authentication/login/login.component';
import {AuthGuard} from './_guards/auth.guard';
import {Error404Component} from './_components/errors/error404/error404.component';

const routes: Routes = [
  {
    path: '404',
    component: Error404Component
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'auth',
    loadChildren:
      () => import('./_modules/_authentication/authentication.module')
        .then(m => m.AuthenticationModule)
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
      },
      {
        path: 'chats',
        loadChildren:
          () => import('./_modules/chat/chat.module')
            .then(m => m.ChatModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
