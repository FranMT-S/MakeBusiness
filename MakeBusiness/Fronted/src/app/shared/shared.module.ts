import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { Page404Component } from './page404/page404.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AvatarComponent } from './avatar/avatar.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    NavbarComponent,
    SidenavComponent,


  ],exports:[
    NavbarComponent,
    SidenavComponent,

  ]
})
export class SharedModule { }
