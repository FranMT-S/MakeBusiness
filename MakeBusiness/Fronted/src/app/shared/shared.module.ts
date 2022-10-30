import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { Page404Component } from './page404/page404.component';
import { SidenavComponent } from './sidenav/sidenav.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SidenavComponent,

  ],exports:[
    NavbarComponent,
    SidenavComponent

  ]
})
export class SharedModule { }
