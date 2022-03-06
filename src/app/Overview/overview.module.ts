import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/Shared.module';
import { PersonalDashboardComponent } from './personal-dashboard/personal-dashboard.component';



@NgModule({
  declarations: [
    PersonalDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class OverviewModule { }
