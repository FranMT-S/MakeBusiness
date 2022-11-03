import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path:"",
    component:UsersComponent,

    children:[
      {
        path:":id/edit-user",
        pathMatch:"full",
        component:EditUserComponent
      },
      {
        path:"add-user",
        pathMatch:"full",
        component:AddUserComponent
      },
      {
        path:"list",
        pathMatch:"full",
        component:ListUserComponent
      },
      { path:"", redirectTo:"list", pathMatch:"full"}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
