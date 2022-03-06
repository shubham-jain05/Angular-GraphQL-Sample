import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: 'overview',
    component:LayoutComponent,
    children:[
        {
            path:'custom',
            loadChildren: () =>
            import('src/app/Overview/overview.module').then(
            (m) => m.OverviewModule
            ),    
        },
        {
            path:'account',
            loadChildren: () =>
            import('src/app/account/account.module').then(
            (m) => m.AccountModule
            ),    
        },
        {
            path:'order',
            loadChildren: () =>
            import('src/app/orders/orders.module').then(
              (m) => m.OrdersModule
            ),    
        },
        {
            path:'users',
            loadChildren: () =>
            import('src/app/users/users.module').then(
              (m) => m.UsersModule
            ),    
        },
        {
            path:'settings',
            loadChildren: () =>
            import('src/app/settings/settings.module').then(
              (m) => m.SettingsModule
            ),    
        },
    ]
  },
  { path: '', redirectTo: '/dashboard/overview/custom', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
