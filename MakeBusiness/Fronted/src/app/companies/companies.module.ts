import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../shared/pipes/pipes.module';
import { CompanyComponent } from './pages/company/company.component';
import { AvatarModule } from '../shared/avatar/avatar.module';


@NgModule({
  declarations: [
    HomeComponent,
    CompanyComponent,
    
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    PipesModule,
    AvatarModule
  ]
})
export class CompaniesModule { }
