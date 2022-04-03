import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../common/componsnts/page-not-found/page-not-found.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: 'admin',
    component:LayoutComponent,
    children:[
        {
            path:'parent',
            loadChildren: () =>
            import('src/app/Overview/overview.module').then(
            (m) => m.OverviewModule
            ),    
        },
        {
            path:'parent',
            loadChildren: () =>
            import('src/app/account/account.module').then(
            (m) => m.AccountModule
            ),    
        },
        {
            path:'parent',
            loadChildren: () =>
            import('src/app/orders/orders.module').then(
              (m) => m.OrdersModule
            ),    
        },
        {
            path:'parent',
            loadChildren: () =>
            import('src/app/users/users.module').then(
              (m) => m.UsersModule
            ),    
        },
        {
            path:'parent',
            loadChildren: () =>
            import('src/app/settings/settings.module').then(
              (m) => m.SettingsModule
            ),    
        },
    ]
  },
  { path:'404', component:PageNotFoundComponent },
  { path: '**', redirectTo: '/layout/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
