import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { ClientRoutingModule } from './client-routing.module';
import { CompaniesComponent } from './pages/companies/companies.component';
import { SharedModule } from '../shared/shared.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ClientComponent } from './client/client.component';

import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { MaterialModule } from '../material/material.module';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    CompaniesComponent,
    NavBarComponent,
    ClientComponent,
    ShoppingCartComponent    
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    MaterialModule,
    NgxPaginationModule
  ]
})
export class ClientModule { }
