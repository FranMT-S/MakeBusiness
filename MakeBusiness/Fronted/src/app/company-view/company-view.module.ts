import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyViewRoutingModule } from './company-view-routing.module';
import { CompanyComponent } from './company/company.component';
import { PagesComponent } from './pages/pages.component';
import { ShopComponent } from './stored/shop.component';
import { MaterialModule } from '../material/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../shared/pipes/pipes.module';



@NgModule({
  declarations: [
    CompanyComponent,
    PagesComponent,
    ShopComponent
  ],
  imports: [
    CommonModule,
    CompanyViewRoutingModule,
    MaterialModule,
    NgxPaginationModule,
    PipesModule
  ]
})
export class CompanyViewModule { }
