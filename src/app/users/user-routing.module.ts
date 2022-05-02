import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ManageUserComponent } from "./manage-user/manage-user.component";

const routes: Routes = [
    {
      path: 'manageUser',
      component: ManageUserComponent ,
    },
    {
      path: 'manageUser/:type/:id',
      component: ManageUserComponent ,
    },
    { path: '', redirectTo: '/manageUser', pathMatch: 'full' },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class userRoutingModule {}