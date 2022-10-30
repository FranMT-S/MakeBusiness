import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistryRoutingModule } from './registry-routing.module';
import { ClientComponent } from './client/client.component';
import { BusinessComponent } from './business/business.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    ClientComponent,
    BusinessComponent
  ],
  imports: [
    CommonModule,
    RegistryRoutingModule,
    MaterialModule
  ]
})
export class RegistryModule { }
