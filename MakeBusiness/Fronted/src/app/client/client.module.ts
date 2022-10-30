import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { CompaniesComponent } from './companies/companies.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CompaniesComponent,
    
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ]
})
export class ClientModule { }
