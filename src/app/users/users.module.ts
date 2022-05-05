import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/Shared.module';
import { userRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageUserComponent } from './manage-user/manage-user.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { NgxLoadingModule } from 'ngx-loading';
import { NgSelectModule } from '@ng-select/ng-select';
import { InMemoryCache } from '@apollo/client/cache';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

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
    ApolloModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: 'http://basic-node-ts-api.herokuapp.com/graphql/',
        }),
      };
    },
    deps: [HttpLink],
  }]
})
export class UsersModule { }
