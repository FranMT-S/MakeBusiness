import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CompaniesComponent } from './companies/companies.component';
import { AddCompanyComponent } from './pages/add-company/add-company.component';
import { EditCompanyComponent } from './pages/edit-company/edit-company.component';
import { ListCompaniesComponent } from './pages/list-companies/list-companies.component';


@NgModule({
  declarations: [
    CompaniesComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    ListCompaniesComponent

  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    MaterialModule
  ],
  exports: [MatSidenavModule],
})
export class CompaniesModule { }
