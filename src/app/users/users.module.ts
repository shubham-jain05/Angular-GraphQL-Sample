import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/Shared.module';
import { userRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    userRoutingModule
  ]
})
export class UsersModule { }
