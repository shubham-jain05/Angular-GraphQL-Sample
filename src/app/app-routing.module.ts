import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from './common/services/auth-gaurd.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full',
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('src/app/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'layout',
    canActivate:[AuthGaurdService],
    loadChildren: () =>
      import('src/app/layout/layout.module').then(
        (m) => m.LayoutModule
      ),
  },
  {
    path: '**',
    redirectTo: 'authentication/Login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
