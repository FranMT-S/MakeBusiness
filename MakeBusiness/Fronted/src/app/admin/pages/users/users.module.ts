import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { MaterialModule } from 'src/app/material/material.module';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { ListUserComponent } from './pages/list-user/list-user.component';


@NgModule({
  declarations: [UsersComponent,  AddUserComponent, ListUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule
  ]
})
export class UsersModule { }
