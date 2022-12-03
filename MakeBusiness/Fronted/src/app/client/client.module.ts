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
import { PipesModule } from '../shared/pipes/pipes.module';
import { HistoryPurchasesComponent } from './pages/history-purchases/history-purchases.component';


@NgModule({
  declarations: [
    CompaniesComponent,
    NavBarComponent,
    ClientComponent,
    ShoppingCartComponent,
    HistoryPurchasesComponent    
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    MaterialModule,
    NgxPaginationModule,
    PipesModule
  ]
})
export class ClientModule { }
