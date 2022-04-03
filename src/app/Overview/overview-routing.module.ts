import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PersonalDashboardComponent } from "./personal-dashboard/personal-dashboard.component";

const routes: Routes = [
    {
      path: 'dashboard',
      component: PersonalDashboardComponent,
    },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class OverviewRoutingModule {}