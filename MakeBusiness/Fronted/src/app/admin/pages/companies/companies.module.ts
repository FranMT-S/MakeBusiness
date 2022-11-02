import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CompaniesComponent } from './companies/companies.component';


@NgModule({
  declarations: [
    CompaniesComponent

  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    MaterialModule
  ],
  exports: [MatSidenavModule],
})
export class CompaniesModule { }
