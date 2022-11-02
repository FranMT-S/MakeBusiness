import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
