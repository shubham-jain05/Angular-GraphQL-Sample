import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/Shared.module';
import { PersonalDashboardComponent } from './personal-dashboard/personal-dashboard.component';
import { OverviewRoutingModule } from './overview-routing.module';

@NgModule({
  declarations: [
    PersonalDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OverviewRoutingModule
  ]
})
export class OverviewModule { }
