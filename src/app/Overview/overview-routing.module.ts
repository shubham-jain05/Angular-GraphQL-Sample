import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PersonalDashboardComponent } from "./personal-dashboard/personal-dashboard.component";

const routes: Routes = [
    {
      path: 'pd',
      component: PersonalDashboardComponent,
    },
    { path: 'overview/custom', redirectTo: 'overview/custom/pd', pathMatch: 'full' },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class OverviewRoutingModule {}