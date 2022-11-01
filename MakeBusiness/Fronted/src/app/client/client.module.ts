import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { CompaniesComponent } from './pages/companies/companies.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ClientComponent } from './client/client.component';

@NgModule({
  declarations: [
    CompaniesComponent,
    NavBarComponent,
    ClientComponent    
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ]
})
export class ClientModule { }
