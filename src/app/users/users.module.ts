import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/Shared.module';
import { userRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageUserComponent } from './manage-user/manage-user.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { NgxLoadingModule } from 'ngx-loading';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [ManageUserComponent],
  imports: [
    CommonModule,
    SharedModule,
    userRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgSelectModule,
    NgxLoadingModule.forRoot({})
  ]
})
export class UsersModule { }
