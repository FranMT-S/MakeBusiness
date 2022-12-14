import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CompaniesModule } from './pages/companies/companies.module';
import { PlainsModule } from './pages/plains/plains.module';
import { TemplatesModule } from './pages/templates/templates.module';
import { UsersModule } from './pages/users/users.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { AvatarModule } from '../shared/avatar/avatar.module';





@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CompaniesModule,
    PlainsModule,
    TemplatesModule,
    UsersModule,
    MaterialModule,  
    PipesModule,
    AvatarModule
  ],

})
export class AdminModule { }
